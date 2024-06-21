import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserName } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const [editMode, setEditMode] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        console.log("Token :", token); 
        console.log("User :", user);
        if (token) {
            dispatch(fetchUserProfile(token));
            console.log(user);
        } else {
            navigate('/login');
        }
    }, [token, dispatch, navigate]);

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
    }, [user]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(updateUserName(token, firstName, lastName));
        setEditMode(false);
    };

    const handleClose = () => {
        setEditMode(false);
    };

    return (
        <div className="ab-profile">
            <h1 className="ab-profile__title">Welcome back! <br /> {user && `${user.firstName} ${user.lastName}`}</h1>
            <button className="ab-button ab-profile__edit" onClick={handleEdit}>Edit Name</button>
            {editMode && (
                <div className="ab-profile__modal">
                    <div className="ab-profile__modal-content">
                        <form onSubmit={handleSave}>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                            />
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                            />
                            <button type="submit" className="ab-button ab-profile__edit-save">Save</button>
                            <button type="button" className="ab-button ab-profile__edit-cancel" onClick={handleClose}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

            <div className="ab-profile__accounts">
                <div className="ab-profile__account" key={1}>
                    <div className="ab-profile__account-info">
                        <h2 className="ab-profile__account-title">Argent Bank Checking (x8349)</h2>
                        <span className="ab-profile__account-amount">$2,082.79</span>
                        <span className="ab-profile__account-ab">Available Balance</span>
                    </div>
                    <div className="ab-profile__account-actions">
                        <button className="ab-button ab-profile__account-btn">View transactions</button>
                    </div>
                </div>
                <div className="ab-profile__account" key={2}>
                    <div className="ab-profile__account-info">
                        <h2 className="ab-profile__account-title">Argent Bank Checking (x6712)</h2>
                        <span className="ab-profile__account-amount">$10,928.42</span>
                        <span className="ab-profile__account-ab">Available Balance</span>
                    </div>
                    <div className="ab-profile__account-actions">
                        <button className="ab-button ab-profile__account-btn">View transactions</button>
                    </div>
                </div>
                <div className="ab-profile__account" key={3}>
                    <div className="ab-profile__account-info">
                        <h2 className="ab-profile__account-title">Argent Bank Checking (x8349)</h2>
                        <span className="ab-profile__account-amount">$184.30</span>
                        <span className="ab-profile__account-ab">Available Balance</span>
                    </div>
                    <div className="ab-profile__account-actions">
                        <button className="ab-button ab-profile__account-btn">View transactions</button>
                    </div>
                </div>
                {/* {user.accounts.map((account, index) => (
                    <div className="ab-profile__account" key={index}>
                        <div className="ab-profile__account-info">
                            <h2 className="ab-profile__account-title">{account.title}</h2>
                            <span className="ab-profile__account-amount">{account.amount}</span>
                            <span className="ab-profile__account-ab">{account.balanceType}</span>
                        </div>
                        <div className="ab-profile__account-actions">
                            <button className="ab-button ab-profile__account-btn">View transactions</button>
                        </div>
                    </div>
                ))} */}
            </div>
        </div>
    );
};

export default Profile;
