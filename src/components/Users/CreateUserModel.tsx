import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import { Row, Col, FormGroup, Label, Card } from 'reactstrap';
import { addUser } from '../../api/userApi';
import { toast } from 'react-toastify';
import RadioGroup from '../../common/components/RadioGroup';
interface params {
  onClose: any;
  onUpdate: any;
}
const sexOptions = [
  { value: 1, label: 'Male' },
  { value: 2, label: 'Female' }
];
function CreateUserModel({ onClose, onUpdate }: params) {
  const [submitting, setSubmitting] = useState(false);
  const [createUser, setCreateUser] = useState({});
  const handleSubmit = () => {
    const create = createUser as any;
    if (!create.first_name) {
      toast.error('Enter first name !');
      return false;
    }
    if (!create.last_name) {
      toast.error('Enter last name !');
      return false;
    }
    if (!create.email) {
      toast.error('Enter email !');
      return false;
    }
    if (!create.phone) {
      toast.error('Enter phone !');
      return false;
    }
    if (!create.password) {
      toast.error('Enter password !');
      return false;
    }
    if (!create.gender) {
      toast.error('Enter gender !');
      return false;
    }
    if (!create.birth) {
      toast.error('Enter birth !');
      return false;
    }
    addUser(createUser).then((response) => {
      const { data } = response;
      if (data.success) {
        onClose();
        onUpdate();
        toast.success('Create success !');
      } else {
        toast.error('create fail !');
      }
    });
    setSubmitting(true);
  };

  const onChange = (e: any) => {
    const edit = createUser as any;
    if (edit[e.target.name] !== 'gender') {
      edit[e.target.name] = e.target.value;
    } else {
      edit[e.target.name] = Number(e.target.value);
    }
    setCreateUser(edit);
  };

  return (
    <Dialog fullWidth={true} maxWidth={'lg'} open={true} aria-labelledby="max-width-dialog-title">
      <DialogTitle id="max-width-dialog-title">Create User</DialogTitle>
      <DialogContent>
        <Row>
          <Col xs={12}>
            <Card body>
              <FormGroup row>
                <Label xs={4}>FirstName</Label>
                <Col xs={8}>
                  <input name="first_name" onChange={onChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label xs={4}>LastName</Label>
                <Col xs={8}>
                  <input name="last_name" onChange={onChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label xs={4}>Email</Label>
                <Col xs={8}>
                  <input name="email" onChange={onChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label xs={4}>Password</Label>
                <Col xs={8}>
                  <input type="password" name="password" onChange={onChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label xs={4}>Phone</Label>
                <Col xs={8}>
                  <input name="phone" onChange={onChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label xs={4}>Gender</Label>
                <Col xs={8}>
                  <RadioGroup name="gender" options={sexOptions} onChange={onChange} disabled={false} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label xs={4}>Birth</Label>
                <Col xs={8}>
                  <input type="date" name="birth" onChange={onChange} />
                </Col>
              </FormGroup>
            </Card>
          </Col>
        </Row>
        <div style={{ marginTop: 15, display: 'flex' }}>
          <Button
            onClick={onClose}
            color="primary"
            disabled={submitting}
            style={{
              padding: 10,
              margin: 'auto',
              width: '15%',
              backgroundColor: '#EB5757',
              fontSize: 18,
              fontWeight: 500,
              color: 'white',
              marginRight: 10
            }}>
            Close
          </Button>
          <Button
            onClick={() => handleSubmit()}
            color="primary"
            disabled={submitting}
            style={{
              padding: 10,
              margin: 'auto',
              width: '15%',
              backgroundColor: '#58C2FE',
              fontSize: 18,
              fontWeight: 500,
              color: 'white',
              marginLeft: 10
            }}>
            {submitting && <CircularProgress />}
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default CreateUserModel;
