NPM_BIN := ./node_modules/.bin
C8 := $(NPM_BIN)/component
C8_SRC := $(NPM_BIN)/component-source

SRC := $(shell $(C8_SRC))


all: build

components: component.json
	$(C8) install --dev

build: components $(SRC)
	$(C8) build --dev

clean:
	rm -rf build

clean-deps:
	rm -rf node_modules components

.PHONY: all clean clean-deps
