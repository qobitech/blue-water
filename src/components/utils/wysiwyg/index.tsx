import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import TextPrompt from '../text-prompt'
import { forwardRef } from 'react'

const modules = {
  toolbar: {
    container: [
      [
        { header: '1' },
        { header: '2' }
        //   { font: [] }
      ],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      //   ['link', 'image', 'video'], // Remove 'link' here to disable link functionality
      ['link'], // Remove 'link' here to disable link functionality
      ['clean']
    ]
  }
}

const formats = [
  'header',
  //   'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link'
  //   'image',
  //   'video'
]

interface IWYSIWYG extends React.ComponentPropsWithoutRef<'textarea'> {
  editorHtml: string
  setEditorHtml: (html: string) => void
  label?: string
  error?: string
  customwidth?: string | number
}

// eslint-disable-next-line react/display-name
const TypeWYSIWYG = forwardRef(
  ({ editorHtml, setEditorHtml, label, error, ...props }: IWYSIWYG, ref) => {
    const handleChange = (html: string) => {
      setEditorHtml(html)
    }

    return (
      <div className="f-column text-left">
        {label && (
          <label
            className="input-label-component"
            htmlFor={props.id || props.name}
          >
            {label}
          </label>
        )}
        <ReactQuill
          theme="snow"
          value={editorHtml}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder={props.placeholder}
          ref={ref as any}
        />
        <div className="py-2" />
        {!!error && <TextPrompt prompt={error} status={false} />}
      </div>
    )
  }
)

export default TypeWYSIWYG
