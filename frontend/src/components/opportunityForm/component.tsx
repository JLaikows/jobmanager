import { FC, useMemo, useState } from 'react';
import { TLoginUser, TSignUpUser } from '../../types/user';
import {
  Box,
  Button,
  Checkbox,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import * as _ from 'lodash';
import { dark } from '@mui/material/styles/createPalette';

interface IAuth {
  createOpportunity: (opportunity: any) => void;
}

interface IJMTextField {
  name: string;
  label?: string;
  type?: any;
  onChange?: any;
  disabled?: any;
  InputProps?: any;
  value?: any;
  sx?: any;
}

export const JMTextField: FC<IJMTextField> = (props) => (
  <div style={{ padding: '2% 0%', width: '100%' }}>
    <TextField {...props}></TextField>
  </div>
);

export const OpportunityForm: FC<IAuth> = ({ createOpportunity }) => {
  const [opportunityInfo, setOpportunityInfo] = useState({});
  const [salaryInfo, setSalaryInfo] = useState({ hourly: false, amount: 0 });
  const [hoursInfo, setHoursInfo] = useState({ fullTime: true, maximum: 40 });
  const [webPortalInfo, setWebPortalInfo] = useState({});
  const [contactInfo, setContactInfo] = useState({});

  const onUpdate = (e: any) => {
    setOpportunityInfo({ ...opportunityInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    createOpportunity({ ...opportunityInfo, salary: salaryInfo });
  };

  const hourlyCheckbox = (
    <>
      <Checkbox
        value={salaryInfo.hourly}
        onChange={() =>
          setSalaryInfo({ ...salaryInfo, hourly: !salaryInfo.hourly })
        }
        title="Hourly"
      />
      <InputLabel>Hourly</InputLabel>
    </>
  );
  const fullTimeCheckbox = (
    <>
      <Checkbox
        value={salaryInfo.hourly}
        onChange={() =>
          setHoursInfo({ ...hoursInfo, fullTime: !hoursInfo.fullTime })
        }
        title="Full Time"
      />
      <InputLabel>FullTime</InputLabel>
    </>
  );

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '10% 5%',
        width: '80%',
        border: '2px solid #7A8D7D',
        borderRadius: '10px',
        transitionDuration: '1s',
      }}
    >
      <JMTextField
        onChange={(e: any) => onUpdate(e)}
        key="a"
        label="Company Name"
        name="company"
      />
      <JMTextField
        onChange={(e: any) => onUpdate(e)}
        key="b"
        label="Title"
        name="title"
      />
      <JMTextField
        onChange={(e: any) =>
          setSalaryInfo({ ...salaryInfo, amount: Number(e.target.value) })
        }
        label=""
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
          endAdornment: (
            <InputAdornment position="end">{hourlyCheckbox}</InputAdornment>
          ),
        }}
        name="salary"
      />
      <JMTextField
        onChange={(e: any) =>
          setHoursInfo({ ...hoursInfo, maximum: Number(e.target.value) })
        }
        value={hoursInfo.maximum}
        disabled={hoursInfo.fullTime}
        type="number"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{fullTimeCheckbox}</InputAdornment>
          ),
        }}
        name="salary"
      />
      <JMTextField
        onChange={(e: any) => onUpdate(e)}
        key="f"
        label="Github"
        name="github"
      />
      <JMTextField
        onChange={(e: any) => onUpdate(e)}
        key="d "
        label="Email"
        name="email"
      />
      <JMTextField
        onChange={(e: any) => onUpdate(e)}
        key="1"
        type="password"
        label="Password"
        name="password"
      />
      <Button
        variant="contained"
        onClick={() => {
          console.log(salaryInfo);
        }}
      >
        Create Opportunity
      </Button>
    </form>
  );
};
