import CodeMirror, { BasicSetupOptions } from "@uiw/react-codemirror";
import { useEffect, useMemo, useState } from "react";
import { Extension } from "@codemirror/state";
import { color } from "@uiw/codemirror-extensions-color";
import { langs } from "@uiw/codemirror-extensions-langs";
import { EditorView } from "@codemirror/view";

import { createTheme } from "@uiw/codemirror-themes";
import { useAtom, useAtomValue } from "jotai";
import { themes } from "@/data/themes";
import {
  fontSizeAtom,
  languageAtom,
  showLineNumbersAtom,
  themeAtom,
} from "@/lib/atoms/editor";
import { codeAtom } from "@/lib/atoms/code";

const baseExtensions: Extension = [];

export default function CodeEditor({
  onEditorCreated,
}: {
  onEditorCreated?: (view: EditorView) => void;
}) {
  const themeKey = useAtomValue(themeAtom);
  const language = useAtomValue(languageAtom);
  const showLineNumbers = useAtomValue(showLineNumbersAtom);
  const fontSize = useAtomValue(fontSizeAtom);
  const [code, setCode] = useAtom(codeAtom);

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

  const theme = useMemo(() => {
    const options = themes[themeKey]?.options;
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
  }, [themeKey]);

  useEffect(() => {
    setExtensions([baseExtensions, color, langs[language]()]);
  }, [language]);

  return (
    <CodeMirror
      value={code}
      onChange={(value) => setCode(value)}
      extensions={extensions}
      theme={theme}
      basicSetup={basicSetup}
      onCreateEditor={onEditorCreated}
      style={{ fontSize }}
    />
  );
}
