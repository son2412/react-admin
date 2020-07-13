import React, { Fragment, Dispatch, useState, useEffect } from 'react';
import TopCard from '../../common/components/TopCard';
import { IUser } from '../../store/models/user.interface';
import { useDispatch, useSelector } from 'react-redux';
import { IStateType } from '../../store/models/root.interface';
import { addAdmin, loadUsers } from '../../store/actions/users.action';
import { updateCurrentPath } from '../../store/actions/root.actions';
import Pagination from '../../common/components/Pagination';
import LoadingBar from '../../common/components/LoadingBar';

const page_size = 10;
const Users: React.FC = () => {
  const [page_index, setPageIndex] = useState(1);
  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath('user', 'list'));

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

  const userElements: JSX.Element[] = users.map((user) => {
    return (
      <tr className={`table-row`} key={`user_${user.id}`}>
        <th scope="row">{user.id}</th>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td>
          <button className="btn btn-success" onClick={() => setUserAdmin(user)}>
            Set admin
          </button>{' '}
        </td>
      </tr>
    );
  });

  return (
    <Fragment>
      <LoadingBar show={loading} />
      <h1 className="h3 mb-2 text-gray-800">Users</h1>
      <p className="mb-4">Users here</p>

      <div className="row">
        <TopCard title="ADMINS" text={'10'} icon="user-tie" class="primary" />
        <TopCard title="USER" text={users.length.toString()} icon="user" class="danger" />
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">User List</h6>
              <div className="header-buttons"></div>
            </div>
            <div className="card-body">
              <div className="table-responsive portlet">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First name</th>
                      <th scope="col">Last name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Admin</th>
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
