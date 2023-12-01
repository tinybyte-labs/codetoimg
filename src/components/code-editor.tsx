import CodeMirror, { BasicSetupOptions } from "@uiw/react-codemirror";
import { useEffect, useMemo, useState } from "react";
import { Extension } from "@codemirror/state";
import { color } from "@uiw/codemirror-extensions-color";
import { LanguageName, langs } from "@uiw/codemirror-extensions-langs";
import { EditorView } from "@codemirror/view";
import { createTheme } from "@uiw/codemirror-themes";
import { themes } from "@/data/themes";

const baseExtensions: Extension = [];

export default function CodeEditor({
  onEditorCreated,
  value,
  onChange,
  readOnly,
  showLineNumbers = true,
  fontSize = 16,
  language = "javascript",
  theme = "vscode",
}: {
  onEditorCreated?: (view: EditorView) => void;
  theme?: string;
  language?: LanguageName;
  showLineNumbers?: boolean;
  fontSize?: number;
  value?: string;
  onChange?: (code: string) => void;
  readOnly?: boolean;
}) {
  const [extensions, setExtensions] = useState<Extension[]>();
  const basicSetup = useMemo(
    () =>
      ({
        foldGutter: false,
        foldKeymap: false,
        searchKeymap: false,
        highlightActiveLine: false,
        highlightActiveLineGutter: false,
        drawSelection: false,
        rectangularSelection: false,
        highlightSelectionMatches: false,
        allowMultipleSelections: false,
        bracketMatching: false,
        highlightSpecialChars: false,
        syntaxHighlighting: false,
        autocompletion: false,
        lineNumbers: showLineNumbers,
      }) satisfies BasicSetupOptions,
    [showLineNumbers],
  );

  const t = useMemo(() => {
    const options = themes[theme]?.options;
    if (options) {
      return createTheme({
        ...options,
        settings: {
          ...options.settings,
          background: "transparent",
          gutterBackground: "transparent",
          gutterBorder: "transparent",
        },
      });
    }
    return undefined;
  }, [theme]);

  useEffect(() => {
    setExtensions([
      baseExtensions,
      color,
      langs[language](),
      EditorView.editable.of(!readOnly),
    ]);
  }, [language, readOnly]);

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={extensions}
      theme={t}
      basicSetup={basicSetup}
      onCreateEditor={onEditorCreated}
      style={{ fontSize }}
    />
  );
}
