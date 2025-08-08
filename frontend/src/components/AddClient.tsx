import React, { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { addClient } from '../clientSlice';
import { clientDetailsSchema, clientFundingSchema, clientSchema } from '../validation/clientSchema';
import { useNavigate } from 'react-router-dom';
import Selector from './Selector';
import { FUNDING, LANGUAGES } from '../constants';
import { format } from 'date-fns';
import moment from 'moment';

const AddClient = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [funding, setFunding] = useState('');
    const [mainLanguage, setMainLanguage] = useState('');
    const [secondaryLanguage, setSecondaryLanguage] = useState('');

    const [formError, setFormError] = useState('');

    const [displayFunding, setDisplayFunding] = useState(false);
    const [displayLanguages, setDisplayLanguages] = useState(false);
    const [displaySubmit, setDisplaySubmit] = useState(false);

    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();

        if (moment(dateOfBirth, 'YYYY-MM-DD', true).isValid() === false) {
            setFormError('Invalid date of birth');
            return;
        }

        if (!displayFunding) {
            const result = clientDetailsSchema.safeParse({
                name,
                date_of_birth: format(dateOfBirth, 'yyyy-MM-dd'),
            });
            if (!result.success) {
                setFormError(result.error.issues[0].message);
                return;
            }
            setDisplayFunding(true);
        } else {
            const result = clientFundingSchema.safeParse({
                funding,
            });
            if (!result.success) {
                setFormError(result.error.issues[0].message);
                return;
            }
            setDisplayLanguages(true);
        }

        setFormError('');
        if (funding) setDisplaySubmit(true);
    }

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();

        if (moment(dateOfBirth, 'YYYY-MM-DD', true).isValid() === false) {
            setFormError('Invalid date of birth');
            return;
        }

        const result = clientSchema.safeParse({
            name,
            date_of_birth: format(dateOfBirth, 'yyyy-MM-dd'),
            funding,
            main_language: mainLanguage,
            secondary_language: secondaryLanguage,
        });
        if (!result.success) {
            setFormError(result.error.issues[0].message);
            return;
        }

        setFormError('');
        await dispatch(addClient({
            name,
            date_of_birth: format(dateOfBirth, 'yyyy-MM-dd'),
            funding,
            main_language: mainLanguage,
            secondary_language: secondaryLanguage,
        }));
        navigate('/');
    };

    return (
        <div className="container">
            <h2>Add New Client</h2>
            <form onSubmit={handleAdd}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        placeholder="Client name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                </div>
                {displayFunding && (
                    <Selector
                        label="Funding"
                        placeholder="Select Funding"
                        value={funding}
                        onChange={setFunding}
                        options={FUNDING}
                    />
                )}
                {displayLanguages && (
                    <>
                        <Selector
                            label="Main Language"
                            placeholder="Select main language"
                            value={mainLanguage}
                            onChange={setMainLanguage}
                            options={LANGUAGES}
                        />
                        <Selector
                            label="Secondary Language"
                            placeholder="Select secondary language"
                            value={secondaryLanguage}
                            onChange={setSecondaryLanguage}
                            options={LANGUAGES}
                        />
                    </>
                )}

                {formError && <p style={{ color: 'red' }}>{formError}</p>}

                <div style={{ display: 'flex', gap: '10px' }}>
                    {!displaySubmit && (
                        <button type="button" onClick={handleNext} className="primary">Next</button>
                    )}
                    {displaySubmit && (
                        <button type="submit" className="primary">Add Client</button>
                    )}
                    <button type="button" onClick={() => navigate('/')} className="secondary">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddClient;
