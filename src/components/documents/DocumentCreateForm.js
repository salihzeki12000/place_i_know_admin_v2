import React from 'react';
import { connect } from 'react-redux';
import { Form, Field, reduxForm, formValueSelector } from 'redux-form';
import { DatePicker, Icon, Input, Button, Select, Upload } from 'antd';
import { makeField } from './../../forms/makeField';
const Option = Select.Option;

const SelectField = makeField(Select);
const InputField = makeField(Input);
const DateField = makeField(DatePicker);
const UploadField = makeField(Upload.Dragger);

export let DocumentCreateForm = props => {
  return (
    <form onSubmit={props.handleSubmit(data => props.onSubmit(data))}>
      <Field label="Document Group" name="documentGroupId" component={SelectField}>
        {props.existingDocumentGroups.map(group => (
          <Option value={group.document_group_id}>{group.title}</Option>
        ))}
        <Option value="new">
          <Icon type="plus" />&nbsp;Create new
        </Option>
      </Field>
      {props.selectedDocumentGroup === 'new' && (
        <Field
          label="New Document Group"
          name="newDocumentGroup"
          component={InputField}
          prefix={<Icon type="folder" />}
        />
      )}
      <Field
        label="File Name"
        name="fileName"
        component={InputField}
        prefix={<Icon type="file" />}
      />
      <Field label="Expiry Date" name="expires" component={DateField} />
      <Button type="primary" htmlType="submit">
        Next&nbsp;<Icon type="right" />
      </Button>&nbsp;
      <Button type="default" onClick={props.handleHideForm}>
        Cancel
      </Button>
    </form>
  );
};

DocumentCreateForm = reduxForm({
  form: 'uploadDocument',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
})(DocumentCreateForm);

const selector = formValueSelector('uploadDocument');

const mapStateToProps = state => ({
  selectedDocumentGroup: selector(state, 'documentGroupId'),
});

export default connect(mapStateToProps)(DocumentCreateForm);
