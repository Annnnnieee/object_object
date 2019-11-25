import sys, logging
from operator import itemgetter
import json



def output(depdict):
    write = sys.stdout.write
    deps = []
    for (from_root, from_), targets in sorted(depdict.iteritems(),
                                             key=itemgetter(0)):
        for to_root, to_ in sorted(targets):
            if (to_):
                deps.append({"source":from_,"target":to_})
    
    with open('dependency_data.json', 'w') as f:
        json.dump(deps, f)


