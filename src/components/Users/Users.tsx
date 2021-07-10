import React, { Fragment, Dispatch, useState, useEffect } from 'react';
import TopCard from '../../common/components/TopCard';
import { IUser, Gender } from '../../store/models/user.interface';
import { useDispatch, useSelector } from 'react-redux';
import { IStateType } from '../../store/models/root.interface';
import { addAdmin, loadUsers } from '../../store/actions/users.action';
import { updateCurrentPath } from '../../store/actions/root.actions';
import Pagination from '../../common/components/Pagination';
import LoadingBar from '../../common/components/LoadingBar';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { toast } from 'react-toastify';
import * as userApi from '../../api/userApi';
import EditButton from '../../assets/editButton.png';
import Nophoto from '../../assets/nophoto.png';
import moment from 'moment';
import EditUserModal from './EditUserModel';
import CreateUserModel from './CreateUserModel';

const page_size = 10;
const Users: React.FC = () => {
  const [page_index, setPageIndex] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [addUser, setAddUser] = useState(false);
  const dispatch: Dispatch<any> = useDispatch();
  // dispatch(updateCurrentPath('user', 'list'));

  useEffect(() => {
    dispatch(updateCurrentPath('users', 'list'));
  }, [dispatch]);

  const users: IUser[] = useSelector((state: IStateType) => state.users.items);
  const loading = useSelector((state: IStateType) => state.users.loading);
  const totalRow = useSelector((state: IStateType) => state.users.totalRow);

  function setUserAdmin(user: IUser): void {
    dispatch(addAdmin(user));
  }

  useEffect(() => {
    dispatch(loadUsers({ page_index, page_size }));
  }, [dispatch, page_index]);

  const handlePageChange = (page_index: number) => {
    setPageIndex(page_index);
  };

  const refreshList = () => {
    dispatch(loadUsers({ page_index, page_size }));
  };

  const deleteUser = (id: number) => {
    if (window.confirm('Do you want delete user ？')) {
      userApi.deleteUser(id).then((response) => {
        const { data } = response;
        if (data.success) {
          refreshList();
          toast.success('Delete success !');
        } else {
          toast.error('Delete fail !');
        }
      });
    }
  };

  const showEditModal = (user: any) => {
    setEditingUser(user);
  };

  const hideEditModal = () => {
    setEditingUser(null);
  };

  const showCreateModal = () => {
    setAddUser(true);
  };

  const hideCreateModal = () => {
    setAddUser(false);
  };

  const userElements: JSX.Element[] = users.map((user, index) => {
    return (
      <tr className={'table-row'} key={index}>
        <th scope="row">{user.id}</th>
        <td>{user.first_name + ' '}{user.last_name ? user.last_name : ''}</td>
        <td>
          <img style={{ width: 30, height: 30, borderRadius: '50%' }} src={user.avatar ? user.avatar : Nophoto} alt="" />
        </td>
        <td>{user.email}</td>
        <td>{user.birthday}</td>
        <td>{user.gender === Gender.MALE ? 'Male' : 'Female'}</td>
        <td>{user.phone}</td>
        <td>{user.roles.map((x) => x.name)}</td>
        <td>{user.login_type === 1 ? 'Facebook' : 'Default'}</td>
        <td>
          <button className="btn btn-success" onClick={() => setUserAdmin(user)}>
            Set admin
          </button>
        </td>
        <td>{moment(user.created_at).format('YYYY/MM/DD HH:mm:ss')}</td>
        <td>
          <Button onClick={() => showEditModal(user)}>
            <img
              src={EditButton}
              style={{
                width: 19,
                height: 18
              }}
              alt=""
            />
          </Button>
          <Button onClick={() => deleteUser(user.id)}>
            <DeleteForeverIcon color="secondary" />
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <Fragment>
      {editingUser && <EditUserModal user={editingUser} onClose={hideEditModal} onUpdate={refreshList} />}
      {addUser && <CreateUserModel onClose={hideCreateModal} onUpdate={refreshList} />}
      <LoadingBar show={loading} />
      <h1 className="h3 mb-2 text-gray-800">Users</h1>
      {/* <p className="mb-4">Users here</p> */}

      <div className="row">
        <TopCard title="ADMINS" text={'10'} icon="user-tie" class="primary" />
        <TopCard title="USER" text={users.length.toString()} icon="user" class="danger" />
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              {/* <h6 className="m-0 font-weight-bold text-green">User List</h6> */}
              <button className="btn btn-success" onClick={() => showCreateModal()}>
                Create User
              </button>
              <div className="header-buttons"></div>
            </div>
            <div className="card-body">
              <div className="table-responsive portlet" style={{ maxHeight: 700 }}>
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">FullName</th>
                      <th scope="col">Avatar</th>
                      <th scope="col">Email</th>
                      <th scope="col">Birth</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Role</th>
                      <th scope="col">Login</th>
                      <th scope="col">Admin</th>
                      <th scope="col">Create At</th>
                      <th scope="col" style={{ paddingLeft: 30 }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>{userElements}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Pagination pageIndex={page_index} totalRow={totalRow} pageSize={page_size} onPageChange={handlePageChange} />
      </div>
    </Fragment>
  );
};

export default Users;
