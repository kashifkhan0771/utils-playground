.PHONY: build wasm ts wasm-exec clean serve

build: wasm wasm-exec ts

wasm:
	GOOS=js GOARCH=wasm go build -o docs/utils.wasm ./wasm/

wasm-exec:
	@rm -f docs/js/wasm_exec.js; \
	GOROOT=$$(GOOS=js GOARCH=wasm go env GOROOT); \
	if [ -f "$$GOROOT/lib/wasm/wasm_exec.js" ]; then \
		cp "$$GOROOT/lib/wasm/wasm_exec.js" docs/js/wasm_exec.js; \
	elif [ -f "$$GOROOT/misc/wasm/wasm_exec.js" ]; then \
		cp "$$GOROOT/misc/wasm/wasm_exec.js" docs/js/wasm_exec.js; \
	else \
		echo "ERROR: wasm_exec.js not found in $$GOROOT"; exit 1; \
	fi

ts:
	npx tsc

clean:
	rm -f docs/utils.wasm docs/js/main.js docs/js/strings.js docs/js/home.js docs/js/gophers.js docs/js/wasm_exec.js

serve: build
	@echo "Serving at http://localhost:8080"
	cd docs && python3 -m http.server 8080
