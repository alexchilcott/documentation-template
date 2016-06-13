#!/bin/bash

rm -R ./deps
mkdir ./deps
pushd ./deps
wget http://netix.dl.sourceforge.net/project/plantuml/plantuml.8039.jar
popd
