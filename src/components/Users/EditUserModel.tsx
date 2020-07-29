import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import { Row, Col, FormGroup, Label, Card } from 'reactstrap';
import { updateUser } from '../../api/userApi';
import { toast } from 'react-toastify';
import RadioGroup from '../../common/components/RadioGroup';
import ImageAvatar from './ImageAvatar';
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
  const [editUser, setEditUser] = useState({});
  const [avatar, setAvatar] = useState(user.image ? user.image.url : '');
  const handleSubmit = () => {
    Object.assign(editUser, { avatar: avatar });
    updateUser(user.id, editUser).then((res) => {
      const { data } = res;
      if (data.success) {
        onClose();
        onUpdate();
        toast.success('Update success !');
        setSubmitting(true);
      } else {
        toast.error(data.message);
      }
    });
  };

  const onChange = (e: any) => {
    const edit = editUser as any;
    edit[e.target.name] = e.target.value;
    setEditUser(edit);
  };

  const handleCreateAvatar = (url: string) => {
    setAvatar(url);
  };

  return (
    <Dialog fullWidth={true} maxWidth={'lg'} open={true} aria-labelledby="max-width-dialog-title">
      <DialogTitle id="max-width-dialog-title">Update User</DialogTitle>
      <DialogContent>
        <Row>
          <Col xs={12}>
            <Card body>
              <FormGroup row>
                <Label xs={4}>Avatar</Label>
                <Col xs={8}>
                  <ImageAvatar avatar={avatar} setAvatar={handleCreateAvatar} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label xs={4}>FirstName</Label>
                <Col xs={8}>
                  <input name="first_name" defaultValue={user.first_name} onChange={onChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label xs={4}>LastName</Label>
                <Col xs={8}>
                  <input name="last_name" defaultValue={user.last_name} onChange={onChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label xs={4}>Email</Label>
                <Col xs={8}>
                  <input name="email" defaultValue={user.email} onChange={onChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label xs={4}>Phone</Label>
                <Col xs={8}>
                  <input name="phone" defaultValue={user.phone} onChange={onChange} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label xs={4}>Gender</Label>
                <Col xs={8}>
                  <RadioGroup name="gender" defaultValue={user.gender} options={sexOptions} onChange={onChange} disabled={false} />
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
