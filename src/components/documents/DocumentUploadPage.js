import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { createNewDocument } from './../../actions/document';
import DocumentCreateForm from './DocumentCreateForm';
import DocumentUploadForm from './DocumentUploadForm';

export class DocumentUploadPage extends React.Component {
  handleDocumentCreateFormSubmission = values => {
    this.props.createNewDocument(values);
  };

  render() {
    if (this.props.isReadyToUploadDocument) {
      return (
        <DocumentUploadForm
          handleSubmit={this.handleNewDocumentSubmit}
          handleHideForm={this.props.onHideForm}
        />
      );
    }
    return (
      <div>
        <h2>Upload New Document</h2>
        <Spin spinning={this.props.isCreatingNewDocument}>
          <DocumentCreateForm
            onSubmit={this.handleDocumentCreateFormSubmission}
            handleHideForm={this.props.onHideForm}
            existingDocumentGroups={this.props.existingDocumentGroups}
          />
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeTripId: state.activeTrip.data.trip_id,
  isCreatingNewDocument:
    state.activeTrip.documents.new === undefined
      ? false
      : state.activeTrip.documents.new.loading,
  isReadyToUploadDocument:
    state.activeTrip.documents.new === undefined
      ? false
      : !(
          state.activeTrip.documents.new.loading &&
          state.activeTrip.documents.new.error === null
        ),
});

const mapDispatchToProps = dispatch => ({
  createNewDocument: data => dispatch(createNewDocument(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentUploadPage);
