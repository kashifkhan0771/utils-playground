//go:build js && wasm

package main

import (
	"strconv"
	"strings"
	"syscall/js"

	utilslice "github.com/kashifkhan0771/utils/slice"
	utilstrings "github.com/kashifkhan0771/utils/strings"
)

func main() {
	c := make(chan struct{})

	// Register all string utility functions
	js.Global().Set("goReverse", js.FuncOf(reverse))
	js.Global().Set("goTitle", js.FuncOf(title))
	js.Global().Set("goRot13Encode", js.FuncOf(rot13Encode))
	js.Global().Set("goCaesarEncrypt", js.FuncOf(caesarEncrypt))
	js.Global().Set("goCaesarDecrypt", js.FuncOf(caesarDecrypt))
	js.Global().Set("goTruncate", js.FuncOf(truncate))
	js.Global().Set("goIsValidEmail", js.FuncOf(isValidEmail))
	js.Global().Set("goRunLengthEncode", js.FuncOf(runLengthEncode))
	js.Global().Set("goRunLengthDecode", js.FuncOf(runLengthDecode))

	// Register all slice utility functions
	js.Global().Set("goRemoveDuplicateStr", js.FuncOf(removeDuplicateStr))
	js.Global().Set("goRemoveDuplicateInt", js.FuncOf(removeDuplicateInt))

	// Signal that WASM is ready
	js.Global().Set("wasmReady", js.ValueOf(true))

	<-c
}

func reverse(_ js.Value, args []js.Value) any {
	if len(args) < 1 {
		return ""
	}
	return utilstrings.Reverse(args[0].String())
}

func title(_ js.Value, args []js.Value) any {
	if len(args) < 1 {
		return ""
	}
	return utilstrings.Title(args[0].String())
}

func rot13Encode(_ js.Value, args []js.Value) any {
	if len(args) < 1 {
		return ""
	}
	return utilstrings.Rot13Encode(args[0].String())
}

func caesarEncrypt(_ js.Value, args []js.Value) any {
	if len(args) < 2 {
		return ""
	}
	return utilstrings.CaesarEncrypt(args[0].String(), args[1].Int())
}

func caesarDecrypt(_ js.Value, args []js.Value) any {
	if len(args) < 2 {
		return ""
	}
	return utilstrings.CaesarDecrypt(args[0].String(), args[1].Int())
}

func truncate(_ js.Value, args []js.Value) any {
	if len(args) < 3 {
		return ""
	}
	opts := &utilstrings.TruncateOptions{
		Length:   args[1].Int(),
		Omission: args[2].String(),
	}
	return utilstrings.Truncate(args[0].String(), opts)
}

func isValidEmail(_ js.Value, args []js.Value) any {
	if len(args) < 1 {
		return false
	}
	return utilstrings.IsValidEmail(args[0].String())
}

func runLengthEncode(_ js.Value, args []js.Value) any {
	if len(args) < 1 {
		return ""
	}
	return utilstrings.RunLengthEncode(args[0].String())
}

func runLengthDecode(_ js.Value, args []js.Value) any {
	if len(args) < 1 {
		return ""
	}
	decoded, err := utilstrings.RunLengthDecode(args[0].String())
	if err != nil {
		return "Error: " + err.Error()
	}
	return decoded
}

func removeDuplicateStr(_ js.Value, args []js.Value) any {
	if len(args) < 1 {
		return "[]"
	}
	input := args[0].String()
	parts := strings.Split(input, ",")
	for i := range parts {
		parts[i] = strings.TrimSpace(parts[i])
	}
	result := utilslice.RemoveDuplicateStr(parts)
	// Format output as JSON array
	return "[" + strings.Join(result, ", ") + "]"
}

func removeDuplicateInt(_ js.Value, args []js.Value) any {
	if len(args) < 1 {
		return "[]"
	}
	input := args[0].String()
	parts := strings.Split(input, ",")
	var nums []int
	for _, p := range parts {
		p = strings.TrimSpace(p)
		if num, err := strconv.Atoi(p); err == nil {
			nums = append(nums, num)
		}
	}
	result := utilslice.RemoveDuplicateInt(nums)
	// Format output as JSON array
	strs := make([]string, len(result))
	for i, num := range result {
		strs[i] = strconv.Itoa(num)
	}
	return "[" + strings.Join(strs, ", ") + "]"
}
