import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-inline_autocomplete'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-spellcheck'
import 'ace-builds/src-noconflict/ext-beautify'
import 'ace-builds/src-noconflict/snippets/c_cpp'
import 'ace-builds/src-noconflict/snippets/javascript'
import 'ace-builds/src-noconflict/snippets/java'
import 'ace-builds/src-noconflict/snippets/python'
import 'ace-builds/src-noconflict/snippets/ruby'
import 'ace-builds/src-noconflict/snippets/php'

const LecturerEditor = ({name, code, setCode, exampleCode}) => {
    return (<AceEditor
    placeholder={exampleCode}
    mode={name==="c" || name==="c++" ? "c_cpp" : name }
    width='100%'
    theme="monokai"
    name={name}
    fontSize={16}
    lineHeight={19}
    showPrintMargin={true}
    showGutter={true}
    onChange={(val) => {
        console.log(val)
        setCode(val)
    }}
    highlightActiveLine={true}
    value={code ? code : exampleCode}
    setOptions={{
    enableBasicAutocompletion: true,
    enableSnippets: false,
    showLineNumbers: true,
    enableMultiselect:true,
    enableLiveAutocompletion:true,
    spellcheck:true,
    

    tabSize: 2,
    }}/>)
              
};

export {LecturerEditor};
