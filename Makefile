SOURCES=$(wildcard source/*)
ZIPFILE=eabso-extension.zip

all: $(ZIPFILE)

$(ZIPFILE): $(SOURCES)
	zip -f $@ $(SOURCES)

clean:
	rm -f $(ZIPFILE)

.PHONY: all clean
