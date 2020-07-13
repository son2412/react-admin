import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import { Row, Col, FormGroup, Label, Card } from 'reactstrap';
import { updateUser } from '../../api/userApi';
import { toast } from 'react-toastify';
import RadioGroup from '../../common/components/RadioGroup';
interface params {
  user: any;
  onClose: any;
  onUpdate: any;
}
const sexOptions = [
  { value: 1, label: 'Male' },
  { value: 2, label: 'Female' }
];
function EditUserModal({ user, onClose, onUpdate }: params) {
  const [submitting, setSubmitting] = useState(false);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [gender, setGender] = useState(user.gender);
  const handleSubmit = () => {
    const data: any = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      gender: gender
    };
    updateUser(user.id, data).then((res) => {
      const { data } = res;
      if (data.success) {
        onClose();
        onUpdate();
        toast.success('Update success !');
      } else {
        toast.error('Update fail !');
      }
    });
    setSubmitting(true);
  };

  return (
    <Dialog fullWidth={true} maxWidth={'lg'} open={true} aria-labelledby="max-width-dialog-title">
      <DialogTitle id="max-width-dialog-title">Update User</DialogTitle>
      <DialogContent>
        <Row>
          <Col xs={12}>
            <Card body>
              <FormGroup row>
                <Label xs={4}>FirstName</Label>
                <Col xs={8}>
                  <input name="first_name" defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label xs={4}>LastName</Label>
                <Col xs={8}>
                  <input name="last_name" defaultValue={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label xs={4}>Email</Label>
                <Col xs={8}>
                  <input name="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label xs={4}>Phone</Label>
                <Col xs={8}>
                  <input name="phone" defaultValue={phone} onChange={(e) => setPhone(e.target.value)} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label xs={4}>Gender</Label>
                <Col xs={8}>
                  <RadioGroup
                    name="gender"
                    defaultValue={gender}
                    options={sexOptions}
                    onChange={(e: any) => setGender(e.target.value)}
                    disabled={false}
                  />
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
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default EditUserModal;
