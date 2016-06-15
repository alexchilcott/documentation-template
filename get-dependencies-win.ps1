function Expand-ZipFile($file, $destination)
{
    Add-Type -assembly “system.io.compression.filesystem”
    [io.compression.zipfile]::ExtractToDirectory($file, $destination)
}

Remove-Item -Path "./deps" -Recurse
New-Item -Path "./deps" -Type Directory
Invoke-WebRequest -Uri http://netix.dl.sourceforge.net/project/plantuml/plantuml.8039.jar -OutFile ./deps/plantuml.8039.jar

Invoke-WebRequest -Uri http://graphviz.org/pub/graphviz/stable/windows/graphviz-2.38.zip -OutFile ./deps/graphviz-2.38.zip

Expand-ZipFile -File ./deps/graphviz-2.38.zip -Destination ./deps/graphviz