## RUN WITH
python main _\<path to root of python project to be analyzed>_

## output
Generates dependency_data.json

## example output

[{"source": "gendep.py", "target": "six.py"}, {"source": "gendep.py", "target": "compiler"}, {"source": "gendep.py", "target": "compiler/ast.py"}, {"source": "gendep.py", "target": "compiler/consts.py"}, {"source": "gendep.py", "target": "compiler/visitor.py"}, {"source": "gendep.py", "target": "copy.py"}, {"source": "gendep.py", "target": "dircache.py"}, {"source": "gendep.py", "target": "logging"}, {"source": "gendep.py", "target": "optparse.py"}, {"source": "gendep.py", "target": "os.py"}, {"source": "gendep.py", "target": "pkgutil.py"}, {"source": "gendep.py", "target": "re.py"}, {"source": "gendep.py", "target": "operator.so"}, {"source": "gendep.py", "target": "imp"}, {"source": "gendep.py", "target": "os.path"}, {"source": "gendep.py", "target": "out.py"}, {"source": "gendep.py", "target": "sys"}, {"source": "out.py", "target": "json"}, {"source": "out.py", "target": "logging"}, {"source": "out.py", "target": "operator.so"}, {"source": "out.py", "target": "sys"}]


credits to snakefood for some pieces of code
