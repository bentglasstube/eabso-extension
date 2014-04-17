SOURCES=$(wildcard source/*)
ZIPFILE=eabso-extension.zip

all: $(ZIPFILE)

$(ZIPFILE): $(SOURCES)
	zip -u $@ $(SOURCES)

clean:
	rm -f $(ZIPFILE)

.PHONY: all clean
