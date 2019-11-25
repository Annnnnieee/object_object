from os.path import *
import os, re, sys, logging
from dircache import listdir
from operator import itemgetter
import compiler
from compiler.visitor import ASTVisitor
from compiler.ast import Discard, Const, AssName, List, Tuple
from compiler.consts import OP_ASSIGN
from six import print_

from out import output


def is_python(fn):
    if fn.endswith('.py'):
        return True
    else:
        try:
            file_head = open(fn).read(64)
            if re.match("#!.*\\bpython", file_head):
                return True
        except IOError:
            return False


def_ignores = ['.svn', 'CVS', 'build', '.hg', '.git']


def iterate_files(dirsorfns, ignores, abspaths=False):
    assert isinstance(dirsorfns, (list, tuple))
    assert isinstance(ignores, (type(None), list))

    ignores = ignores or def_ignores
    for dn in dirsorfns:
        if not abspaths:
            dn = realpath(dn)

        if not exists(dn):
            continue

        if not isdir(dn):
            if is_python(dn):
                yield dn

        else:
            for root, dirs, files in os.walk(dn):
                for r in ignores:
                    try:
                        dirs.remove(r)
                    except ValueError:
                        pass

                afiles = [join(root, x) for x in files]
                for fn in filter(is_python, afiles):
                    yield fn



def filter_separate(pred, seq):
    inlist = []
    outlist = []
    for e in seq:
        if pred(e):
            inlist.append(e)
        else:
            outlist.append(e)
    return inlist, outlist


def find_roots(list_dirofn, ignores):
    inroots = set()
    for fn in map(realpath, list_dirofn):
        root = find_package_root(fn, ignores)
        if root:
            inroots.add(root)
        elif isfile(fn):
            inroots.add(dirname(fn))
        else:
            assert isdir(fn)

            downroots = search_for_roots(fn, ignores)
            if downroots:
                inroots.update(downroots)
    return sorted(inroots)

def find_package_root(fn, ignores):
    if not isdir(fn):
        fn = dirname(fn)
    while is_package_dir(fn):
        assert fn
        fn = dirname(fn)
    if fn and is_package_root(fn, ignores):
        return fn

def search_for_roots(dn, ignores):
    if not isdir(dn):
        dn = dirname(dn)
    roots = []
    for root, dirs, files in os.walk(dn):
        for d in list(dirs):
            if d in ignores:
                dirs.remove(d)
        if is_package_root(root, ignores):
            roots.append(root)
            dirs[:] = []
    return roots

def is_package_dir(dn):
    return exists(join(dn, '__init__.py'))


def is_package_root(dn, ignores):
    if not exists(dn) or exists(join(dn, '__init__.py')):
        return False

    else:
        dirfiles = (join(dn, x) for x in listdir(dn))
        subdirs, files = filter_separate(isdir, dirfiles)

        pyfiles = []
        for x in files:
            bx = basename(x)
            if bx in ignores:
                continue
            if bx.endswith('.so') or is_python(x):
                pyfiles.append(bx)

        if join(dn, 'site-packages') in subdirs:
            return True

        for sub in subdirs:
            bsub = basename(sub)
            if '.' in bsub or bsub in ignores:
                continue
            if exists(join(sub, '__init__.py')):
                return True

    return False

def relfile(fn, ignores):
    root = find_package_root(realpath(fn), ignores)
    if root is None:
        root = dirname(fn)
        rlen = basename(fn)
    else:
        rlen = fn[len(root)+1:]

    assert root is not None and rlen is not None
    return root, rlen


class defaultdict(dict):
        def __init__(self, default_factory=None, *a, **kw):
            if (default_factory is not None and
                not hasattr(default_factory, '__call__')):
                raise TypeError()
            dict.__init__(self, *a, **kw)
            self.default_factory = default_factory
        def __getitem__(self, key):
            try:
                return dict.__getitem__(self, key)
            except KeyError:
                return self.__missing__(key)
        def __missing__(self, key):
            if self.default_factory is None:
                raise KeyError(key)
            self[key] = value = self.default_factory()
            return value
        def __reduce__(self):
            if self.default_factory is None:
                args = tuple()
            else:
                args = self.default_factory,
            return type(self), args, None, None, self.items()
        def copy(self):
            return self.__copy__()
        def __copy__(self):
            return type(self)(self.default_factory, self)
        def __deepcopy__(self, memo):
            import copy
            return type(self)(self.default_factory,
                              copy.deepcopy(self.items()))
        def __repr__(self):
            return 'defaultdict(%s, %s)' % (self.default_factory,
                                            dict.__repr__(self))


def gendeps():
    import optparse
    parser = optparse.OptionParser()


    opts, args = parser.parse_args()

 
    if not args:
        args = ['.']


    for arg in args:
        fn = realpath(arg)
        if not exists(fn):
            parser.error("Filename '%s' does not exist." % fn)

    inroots = find_roots(args, def_ignores)

    sys.path = inroots + sys.path

    inroots = frozenset(inroots)

    allfiles = defaultdict(set)
    allerrors = []
    processed_files = set()

    fiter = iterate_files(args, def_ignores, False)
    while 1:
        newfiles = set()
        for fn in fiter:
            if fn in processed_files:
                continue

            processed_files.add(fn)

            if is_python(fn):
                files, errors = find_dependencies(
                    fn, 0, True, None)
                allerrors.extend(errors)
            else:
                files = []

            if basename(fn) == '__init__.py':
                fn = dirname(fn)
            
            from_ = relfile(fn, def_ignores)
            if from_ is None:
                continue
            infrom = from_[0] in inroots
            allfiles[from_].add((None, None))

            for dfn in files:
                xfn = dfn
                if basename(xfn) == '__init__.py':
                    xfn = dirname(xfn)

                to_ = relfile(xfn, def_ignores)
                into = to_[0] in inroots
                allfiles[from_].add(to_)
                newfiles.add(dfn)

        if not (None and newfiles):
            break
        else:
            fiter = iter(sorted(newfiles))

  
    output(allfiles)

def filter_unused_imports(ast, found_imports):
    used_imports, unused_imports = [], []
    dotted_names, simple_names = get_names_from_ast(ast)
    vis = AllVisitor()
    compiler.walk(ast, vis)
    exported = vis.finalize()
    usednames = set(x[0] for x in dotted_names)
    usednames.update(x[0] for x in exported)
    used_imports = []
    for x in found_imports:
        _, _, lname, lineno, _,  _ = x
        if lname is not None and lname not in usednames:
            unused_imports.append(x)
        else:
            used_imports.append(x)

    return used_imports, unused_imports

def find_dependencies(fn, verbose, process_pragmas,
                      ignore_unused=False,
                      warning_lambda=logging.warning,
                      debug_lambda=logging.debug):
    file_errors = []

    ast, _ = parse_python_source(fn)
    if ast is None:
        return [], file_errors
    found_imports = get_ast_imports(ast)
    if found_imports is None:
        return [], file_errors


    output_code = (verbose >= 2)
    source_lines = None
    if output_code:
        source_lines = open(fn, 'rU').read().splitlines()

    files = []
    assert not isdir(fn)
    dn = dirname(fn)
    seenset = set()
    for x in found_imports:
        mod, rname, lname, lineno, level, pragma = x
        sig = (mod, rname)
        if sig in seenset:
            continue
        seenset.add(sig)

        modfile, errors = find_dotted_module(mod, rname, dn, level)
        

        if modfile is None:
            continue
        files.append(realpath(modfile))

    return files, file_errors

def find_imports(fn, verbose, ignores):
    ast, _ = parse_python_source(fn)
    if ast is None:
        raise StopIteration

    found_imports = get_ast_imports(ast)
    if found_imports is None:
        raise StopIteration

    dn = dirname(fn)

    packroot = None
    for modname, rname, lname, lineno, _, _ in found_imports:
        islocal = False
        names = modname.split('.')
        if find_dotted(names, dn):
            reldir = dirname(fn)[len(packroot)+1:]
            modname = '%s.%s' % (reldir.replace(os.sep, '.'), modname)
            islocal = True

        if rname is not None:
            modname = '%s.%s' % (modname, rname)
        yield (modname, lineno, islocal)


class ImportVisitor(object):
    def __init__(self):
        self.modules = []
        self.recent = []

    def visitImport(self, node):
        self.accept_imports()
        self.recent.extend((x[0], None, x[1] or x[0], node.lineno, 0)
                           for x in node.names)

    def visitFrom(self, node):
        self.accept_imports()
        modname = node.modname
        for name, as_ in node.names:
            if name == '*':
                mod = (modname, None, None, node.lineno, node.level)
            else:
                mod = (modname, name, as_ or name, node.lineno, node.level)
            self.recent.append(mod)

    def visitAssign(self, node):
        lhs = node.nodes
        if (len(lhs) == 1 and
            isinstance(lhs[0], AssName) and
            lhs[0].name == '__all__' and
            lhs[0].flags == OP_ASSIGN):

            rhs = node.expr
            if isinstance(rhs, (List, Tuple)):
                for namenode in rhs:
                    if isinstance(namenode, Const):
                        modname = namenode.value
                        mod = (modname, None, modname, node.lineno, 0)
                        self.recent.append(mod)

    def default(self, node):
        pragma = None
        if self.recent:
            if isinstance(node, Discard):
                children = node.getChildren()
                if len(children) == 1 and isinstance(children[0], Const):
                    const_node = children[0]
                    pragma = const_node.value

        self.accept_imports(pragma)

    def accept_imports(self, pragma=None):
        self.modules.extend((m, r, l, n, lvl, pragma)
                            for (m, r, l, n, lvl) in self.recent)
        self.recent = []

    def finalize(self):
        self.accept_imports()
        return self.modules


def check_duplicate_imports(found_imports):
    uniq, dups = [], []
    simp = set()
    for x in found_imports:
        modname, rname, lname, lineno, _, pragma = x
        if rname is not None:
            key = modname + '.' + rname
        else:
            key = modname
        if key in simp:
            dups.append(x)
        else:
            uniq.append(x)
            simp.add(key)
    return uniq, dups


class ImportWalker(ASTVisitor):
    def __init__(self, visitor):
        ASTVisitor.__init__(self)
        self._visitor = visitor

    def default(self, node, *args):
        self._visitor.default(node)
        ASTVisitor.default(self, node, *args)


def parse_python_source(fn):
    contents = open(fn, 'rU').read()
    lines = contents.splitlines()

    ast = compiler.parse(contents)
    return ast, lines

def get_ast_imports(ast):
    assert ast is not None
    vis = ImportVisitor()
    compiler.walk(ast, vis, ImportWalker(vis))
    found_imports = vis.finalize()
    return found_imports

libpath = ''
exceptions = ('os.path',)
builtin_module_names = sys.builtin_module_names + exceptions

module_cache = {}

def find_dotted_module(modname, rname, parentdir, level):
    if modname in builtin_module_names:
        return join(libpath, modname), None

    errors = []
    names = modname.split('.')
    for i in range(level - 1):
        parentdir = dirname(parentdir)
    fn = find_dotted(names, parentdir)
    if not fn:
        try:
            fn = module_cache[modname]
        except KeyError:
            fn = find_dotted(names)
            module_cache[modname] = fn

    if rname:
        fn2 = find_dotted([rname], dirname(fn))
        if fn2:
            fn = fn2

    return fn, errors

try:
    from imp import ImpImporter
except ImportError:
    from pkgutil import ImpImporter
    

def find_dotted(names, parentdir=None):
    filename = None
    for name in names:
        mod = ImpImporter(parentdir).find_module(name)
        if not mod:
            break
        filename = mod.get_filename()
        if not filename:
            break
        parentdir = dirname(filename)
    else:
        return filename



def main():
    gendeps()
