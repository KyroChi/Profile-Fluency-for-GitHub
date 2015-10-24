build_all: build_chrome build_firefox
		@echo built chrome and firefox development directories

build_chrome:
		@rm -rf chrome_development/
		@mkdir chrome_development
		@cp src/js/content.js chrome_development/
		@cp src/json/github_colors.js chrome_development/
		@cp src/icon/icon-16.png chrome_development/
		@cp src/icon/icon-32.png chrome_development/
		@cp src/icon/icon-64.png chrome_development/
		@cp src/icon/icon-128.png chrome_development/
		@cp chrome/manifest.json chrome_development/
		@echo chrome development directory created

build_firefox:
		@rm -rf firefox_development/
		@mkdir firefox_development/
		@cp firefox/package.json firefox_development/
		@mkdir firefox_development/data/
		@cp firefox/firefox.js firefox_development/data/
		@cp src/js/content.js firefox_development/data/
		@cp src/icon/icon-16.png firefox_development/data/
		@cp src/icon/icon-32.png firefox_development/data/
		@cp src/icon/icon-64.png firefox_development/data/

		@cp src/js/content.js firefox_development/data/
		@cp src/json/github_colors.js firefox_development/data/

		@echo firefox development directory created


deconstruct_all: deconstruct_chrome deconstruct_firefox
		@echo removing development directories

deconstruct_chrome:
		@rm -rf chrome_development/
		@echo chrome development folder destroyed

deconstruct_firefox:
		@rm -rf firefox_development/
		@echo firefox development folder destroyed

help:
		@echo Make Help
		@echo make or make build_all
		@echo -- builds a chrome and a firefox development directory in root
		@echo make build_chrome
		@echo -- builds a chrome development directory
		@echo make build_firefox
		@echo -- builds a chrome development directory
		@echo make deconstruct_all
		@echo -- removes all development directories
		@echo make deconstruct_chrome
		@echo -- removes chrome development directories
		@echo make deconstruct_firefox
		@echo -- removes firefox development directories