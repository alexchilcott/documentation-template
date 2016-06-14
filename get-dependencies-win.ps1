Remove-Item -Path "./deps" -Recurse
New-Item -Path "./deps" -Type Directory
Invoke-WebRequest -Uri http://netix.dl.sourceforge.net/project/plantuml/plantuml.8039.jar -OutFile ./deps/plantuml.8039.jar
