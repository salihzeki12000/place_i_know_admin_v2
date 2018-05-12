import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { finishUploadingDocument } from './../../actions/document';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Form, Icon, Button, Upload } from 'antd';
import { makeField } from './../../forms/makeField';
const FormItem = Form.Item;

const UploadField = makeField(Upload.Dragger);

const customUploadRequest = ({
  action,
  data,
  file,
  filename,
  headers,
  onError,
  onProgress,
  onSuccess,
}) => {
  const formData = new FormData();
  if (data) {
    Object.keys(data).map(key => {
      formData.append(key, data[key]);
    });
  }
  formData.append(filename, file);

  axios
    .put(action, formData, {
      headers,
      onUploadProgress: ({ total, loaded }) => {
        onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file);
      },
    })
    .then(({ data: response }) => {
      onSuccess(response, file);
    })
    .catch(onError());
};

export class DocumentUploadForm extends React.Component {
  handleFinishUploading = () => {
    this.props.handleHideForm();
    this.props.finishUploading(this.props.uploadObject.document_id);
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit} layout="vertical">
        <Field
          name="file"
          component={UploadField}
          multiple={false}
          accept="application/pdf"
          action={this.props.uploadUrl}
          headers={{
            Key: this.props.uploadObject.s3_object,
            'Content-Type': 'application/pdf',
          }}
          customRequest={customUploadRequest}
          onSuccess={this.handleFinishUploading}
        >
          <p className="ant-upload-drag-icon">
            <Icon type="file-pdf" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Field>
        <Button type="default" onClick={this.props.handleHideForm}>
          Cancel
        </Button>
      </Form>
    );
  }
}

DocumentUploadForm = reduxForm({ form: 'uploadDocument' })(DocumentUploadForm);

const mapStateToProps = state => ({
  uploadUrl: state.activeTrip.documents.new.data.upload.signedUrl,
  uploadObject: state.activeTrip.documents.new.data.document,
});

const mapDispatchToProps = dispatch => ({
  finishUploading: documentId => dispatch(finishUploadingDocument(documentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentUploadForm);
