import React from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Icon, Spin } from 'antd';
import DocumentGroups from './DocumentGroups';
import { getDocumentGroups } from './../../actions/document';
import DocumentUploadPage from './DocumentUploadPage';

export class DocumentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploadFormVisible: false,
    };
  }

  componentDidMount() {
    this.props.getDocumentGroups(this.props.trip.trip_id);
  }

  toggleUploadFormVisibility = () => {
    this.setState(prevState => ({
      isUploadFormVisible: !prevState.isUploadFormVisible,
    }));
  };

  render() {
    if (this.props.documentGroups === undefined || this.props.documentGroups.loading) {
      return <Spin indicator={<Icon type="loading" spin />} />;
    }
    return (
      <div>
        {!this.state.isUploadFormVisible && (
          <Button
            type="primary"
            icon="upload"
            size="large"
            onClick={this.toggleUploadFormVisibility}
          >
            Upload
          </Button>
        )}

        {this.state.isUploadFormVisible && (
          <DocumentUploadPage
            existingDocumentGroups={this.props.documentGroups.data}
            onHideForm={this.toggleUploadFormVisibility}
          />
        )}
        <Divider />
        <DocumentGroups groups={this.props.documentGroups.data} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  documentGroups: state.activeTrip.documents,
});

const mapDispatchToProps = dispatch => ({
  getDocumentGroups: tripId => dispatch(getDocumentGroups(tripId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsPage);
