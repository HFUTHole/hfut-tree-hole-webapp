import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import type { Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'

export function MyEditor(props: { control: Control<any, any>; name: string }) {
  const [editor, setEditor] = useState<IDomEditor | null>(null)

  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: [
      'fullScreen',
      'group-video',
      'insertTable',
      'fontFamily',
      'lineHeight',
      'numberedList',
      'bulletedList',
      'bgColor',
      'color',
      'headerSelect',
      'blockquote',
      'fontSize',
      'group-justify',
      'group-indent',
    ],
  }
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
  }

  useEffect(() => {
    return () => {
      if (editor == null)
        return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100, marginTop: '15px' }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Controller
          control={props.control}
          name={props.name}
          render={({ field }) => (
            <Editor
              defaultConfig={editorConfig}
              onCreated={setEditor}
              value={field.value}
              onChange={(editor) => {
                if (editor.getText().length) {
                  field.onChange(editor.getHtml())
                } else {
                  field.onChange('')
                }
              }}
              mode="default"
              style={{ height: '500px' }}
            />
          )}
        />
      </div>
    </>
  )
}
