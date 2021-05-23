RM = rm -rf
LIB = public/lib
MINIMIZE = uglifyjs $(TARGET)/JSAV.js --comments '/^!|@preserve|@license|@cc_on/i' >$(TARGET)/JSAV-min.js
CAT = cat
SRC = public/lib
TARGET = public/lib
SRC2 = public/src

SOURCES = $(SRC)/front.js $(SRC)/core.js $(SRC)/translations.js $(SRC)/anim.js $(SRC)/utils.js $(SRC)/messages.js $(SRC)/effects.js $(SRC)/events.js $(SRC)/graphicals.js $(SRC)/datastructures.js $(SRC)/array.js $(SRC)/tree.js $(SRC)/list.js $(SRC)/graph.js $(SRC)/matrix.js $(SRC)/code.js $(SRC)/settings.js $(SRC)/questions.js $(SRC)/exercise.js $(SRC)/version.js $(SRC2)/bubblesort.js $(SRC2)/insertionsort.js $(SRC2)/mergesort.js $(SRC2)/queue.js $(SRC2)/stack.js

# This only works right when this is a submodule
	FETCH = ../.git/modules/JSAV/FETCH_HEAD

all: build

clean:
	$(RM) public/lib/*~ public/lib/version.txt public/lib/front.js public/lib/version.js


build: $(TARGET)/JSAV.js $(TARGET)/JSAV-min.js

$(TARGET)/JSAV.js: $(SRC)/version.txt $(SRC)/front.js $(SRC)/version.js $(SOURCES)
	-mkdir $(TARGET)
	$(CAT) $(SOURCES) > $(TARGET)/JSAV.js

$(FETCH):

$(SRC)/version.txt: $(FETCH)
	git describe --tags --long | awk '{ printf "%s", $$0 }' - > $(SRC)/version.txt

$(SRC)/front.js: $(SRC)/front1.txt $(SRC)/version.txt $(SRC)/front2.txt
	$(CAT) $(SRC)/front1.txt $(SRC)/version.txt $(SRC)/front2.txt > $(SRC)/front.js

$(SRC)/version.js :$(SRC)/version1.txt $(SRC)/version.txt $(SRC)/version2.txt
	$(CAT) $(SRC)/version1.txt $(SRC)/version.txt $(SRC)/version2.txt > $(SRC)/version.js

$(TARGET)/JSAV-min.js: $(SRC)/version.txt $(SRC)/front.js $(SRC)/version.js $(SOURCES)
	-$(MINIMIZE)

jshint:
	-jshint public/lib/

csslint:
	csslint --errors=empty-rules,import,errors --warnings=duplicate-background-images,compatible-vendor-prefixes,display-property-grouping,fallback-colors,duplicate-properties,shorthand,gradients,font-sizes,floats,overqualified-elements,import,regex-selectors,rules-count,unqualified-attributes,vendor-prefix,zero-units css/JSAV.css

lint: jshint csslint