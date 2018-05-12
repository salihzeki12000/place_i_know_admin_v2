import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
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
        addonAfter=".pdf"
      />
      <Field label="Expiry Date" name="expires" component={DateField} defaultValue={props.tripEndDate.add(3, 'M')} />
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
  form: 'createDocument',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
})(DocumentCreateForm);

const selector = formValueSelector('createDocument');

const mapStateToProps = state => ({
  selectedDocumentGroup: selector(state, 'documentGroupId'),
  tripEndDate: moment(state.activeTrip.data.end_date),
});

export default connect(mapStateToProps)(DocumentCreateForm);
