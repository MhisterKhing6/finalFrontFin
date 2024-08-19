import Editor from 'react-monaco-editor';

const EditorReadOnly = ({code}) => {
  const options = {
    autoIndent: 'full',
    contextmenu: true,
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: 'always',
    minimap: {
      enabled: true,
    },
    scrollbar: {
      horizontalSliderSize: 4,
      verticalSliderSize: 18,
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: true,
    cursorStyle: 'line',
    automaticLayout: true,
  }; 
   return ( <Editor
        height={"300px"}
        value={code}

        options={options}
        theme='hc-light'
    />)
}

export { EditorReadOnly };
