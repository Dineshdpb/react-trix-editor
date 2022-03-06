import React, { Component } from "react";
import Trix from "trix";
import "trix/dist/trix";
import "trix/dist/trix.css";
import "tributejs/tribute.css";
import Tribute from "tributejs";
import { Obeserver } from "./Obeserver";
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.ediotrInput = React.createRef();
    this.tribute = React.createRef();
    
  }
  
  componentDidMount() {
    

    this.ediotrInput.current.addEventListener('trix-before-initialize', function(e) {
      const currentEditor = textEditor.current;
      this.tribute.current=new Tribute({
        values: [
          { key: "schniz", value: "Gal Schlezinger" },
          { key: "deanshub", value: "Dean Shub" }
        ]
      })
      this.tribute.current.attach(currentEditor)

    })
    this.ediotrInput.current.addEventListener("trix-change", (event) => {
      this.props.onChange(event.target.innerHTML); //calling custom event
      let reff=this.ediotrInput.current.editor
      console.log(reff.getDocument().toString())
      console.log(reff.selectionManager.selectionDidChange())
      // var attachment = new Trix.Attachment({ content: '<span class="mention">@trix</span>' })
      // reff.insertAttachment(attachment)
      // console.log(reff)



    });
    this.ediotrInput.current.addEventListener("trix-attachment-add",(event) => {
        console.log(event.attachment);
        if(event.attachment.file){
          // setContent( event.attachment, event.attachment.file); 
          
          uploadFileAttachment(event.attachment)
        }
    });
    this.ediotrInput.current.addEventListener("trix-attachment-remove",(event)=>{
      console.log(event)
    })
    this.ediotrInput.current.addEventListener("trix-file-accept",(event)=>{
      console.log(event)
    })
  }

  render() {
    return (
      <div>
        <input type="hidden" id="trix" value={this.props.value} />
        <trix-editor input="trix" ref={this.ediotrInput} />
        {/* <Obeserver editor={this.ediotrInput}/> */}
      </div>
    );
  

}

}
export default Editor;

function uploadFileAttachment(attachment) {
  debugger
  uploadFile(attachment.file, setProgress, setAttributes)
 debugger
  function setProgress(progress) {
    
    attachment.setUploadProgress(progress)
  }
 
  function setAttributes(attributes) {
    attachment.setAttributes(attributes)
  }
 }
 function setContent( attachment, data ) {
 debugger
  let file = attachment.file;
  let imageUrl='https://picsum.photos/200/300'
  let attributes ={
    previewable: false,
                url: data.url,
                href: data.url
  };
  if (!data.type ){ 
      data.type = "application/file";
  }
  if ( data.type.includes("image") ) { 
    // image
      attributes["content"] = `
          <span class="trix-preview-image" data-url="https://picsum.photos/200/300"  data-name="${file.name}" >
              <img src="https://picsum.photos/200/300"  class="trix-preview-image" data-url="https://picsum.photos/200/300"  data-name="${file.name}" /> 
          <span>
      `;
      
  } else if ( data.type.includes("video") ) { // video
      attributes["content"] = `
          <span class="trix-preview-video"  data-url="${data.url}"  data-name="${file.name}" >
              <video width="100%" height="auto" controls>
                  <source src="${data.url}" type="${data.type}">
              </video>
          <span>
      `;
 
  } else {  // other
      attributes["content"] = `
          <span class="trix-preview-file" data-url="${data.url}"  data-name="${file.name}" >
              ${file.name}
          <span>
          
      `;
  }
  debugger
 attachment.setUploadProgress(100)
  attachment.setAttributes(attributes);
 }  
 
 function uploadFile(file, progressCallback, successCallback) {
  // var key = createStorageKey(file)
  var formData = createFormData( file)
  var xhr = new XMLHttpRequest()
 let HOST=""
  xhr.open("POST", HOST, true)
 debugger
  xhr.upload.addEventListener("progress", function(event) {
    debugger
    var progress = event.loaded / event.total * 100
    progressCallback(progress)
  })
 
  xhr.addEventListener("load", function(event) {
    debugger
    if (xhr.status == 204) {
      var attributes = {
        url: HOST + key,
        href: HOST
      }
      successCallback(attributes)
    }
  })
  // xhr.setRequestHeader("Content-Type","multipart/form-data")
  debugger
 xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMyLCJuYW1lIjoiQWlyIiwiYnVzaW5lc3NfaWQiOjE4OCwiZXhwIjoxNjUxNzczNDQ3LjM1OCwiaWF0IjoxNjQ2NTg5NDQ3fQ.K-QLgzbSgACmOLFfkNjmx6HuoSpCxs9OYPYlw4DbeW4");
 debugger
  xhr.send(formData)
 }
 
 function createStorageKey(file) {
  var date = new Date()
  var day = date.toISOString().slice(0,10)
  var name = date.getTime() + "-" + file.name
  return [ "tmp", day, name ].join("/")
 }
 
 function createFormData( file) {
  var data = new FormData()
  data.append("project_id", 270)
  data.append("task_id", 1664)
  data.append("comment", null)
  data.append("attachment", file)
  return data
 }


// //  oninti
// this.ediotrInput.current.addEventListener('trix-initialize', function(e) {
//   let editor  = e.target;
//   let toolbar = editor.toolbarElement;
//   let ttools  = toolbar.querySelector(".trix-button-group--text-tools");
//   let dialogs = toolbar.querySelector(".trix-dialogs");
//   let trixId  = editor.trixId;

//   let buttonContent = `
//     <button type="button"
//       class="trix-button trix-button--icon trix-button--icon-attach"
//       data-trix-attribute="attach"
//       data-trix-key="+" title="Attach file" tabindex="-1">
//     </button>
//   `;

//   let dialogContent = `
//     <div class="trix-dialog trix-dialog--attach" data-trix-dialog="attach" data-trix-dialog-attribute="attach">
//       <div class="trix-dialog__attach-fields">
//         <input type="file" class="trix-input trix-input--dialog">
//         <div class="trix-button-group">
//           <input type="button" class="trix-button trix-button--dialog"
//             onclick="
//               var trix = document.querySelector('trix-editor[trix-id=\\'${trixId}\\']');
//               var fileElm = this.parentElement.parentElement.querySelector('input[type=\\'file\\']');
//               if ( fileElm.files.length == 0 ) {
//                 console.log('nothing selected');
//                 return;
//               }
//               var file = fileElm.files[0];
//               trix.editor.insertFile(file);
//             "
//             value="Attach" data-trix-method="removeAttribute">
//           <input type="button" class="trix-button trix-button--dialog" value="Cancel" data-trix-method="removeAttribute">
//         </div>
//       </div>
//     </div>
//   `;
//   // add attach icon button
//   ttools.insertAdjacentHTML("beforeend", buttonContent);
//   // add dialog
//   dialogs.insertAdjacentHTML("beforeend", dialogContent);
// });