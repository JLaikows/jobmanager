import { FC, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material';
import * as _ from 'lodash';

interface IAuth {
  createOpportunity: (opportunity: any) => void;
  opportunity?: any;
}

interface IJMTextField {
  name?: string;
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

export const OpportunityForm: FC<IAuth> = ({
  createOpportunity,
  opportunity,
}) => {
  const [opportunityInfo, setOpportunityInfo] = useState(opportunity ?? {});
  const [salaryInfo, setSalaryInfo] = useState(
    opportunity?.salary ?? { hourly: false, amount: 0 },
  );
  const [hoursInfo, setHoursInfo] = useState(
    opportunity?.hours ?? { fullTime: true, minimum: 40 },
  );
  const [hasWebPortal, setHasWebPortal] = useState(
    !!opportunity?.webPortal ?? false,
  );
  const [webPortalInfo, setWebPortalInfo] = useState(
    opportunity?.webPortal ?? {},
  );
  const [isLoading, setIsLoading] = useState(false);

  const onUpdate = (e: any) => {
    setOpportunityInfo({ ...opportunityInfo, [e.target.name]: e.target.value });
  };

  const onUpdateWebPortal = (e: any) => {
    setWebPortalInfo({ ...webPortalInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await createOpportunity({
        ...opportunityInfo,
        salary: salaryInfo,
        hours: hoursInfo,
        ...(hasWebPortal && { webPortal: webPortalInfo }),
      });
      setIsLoading(false);
      window.location.href = 'http://localhost:3000/';
    } catch {
      setIsLoading(false);
    }
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
  if (isLoading) {
    return <div>Loading</div>;
  }
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
        label="Company Name"
        name="company"
      />
      <JMTextField
        onChange={(e: any) => onUpdate(e)}
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
          setHoursInfo({ ...hoursInfo, minimum: Number(e.target.value) })
        }
        value={hoursInfo.minimum}
        disabled={!hoursInfo.fullTime}
        type="number"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{fullTimeCheckbox}</InputAdornment>
          ),
        }}
        name="salary"
      />
      <FormControlLabel
        control={<Checkbox onChange={() => setHasWebPortal(!hasWebPortal)} />}
        label="Has Web Portal"
      />
      {hasWebPortal && (
        <>
          <JMTextField
            onChange={(e: any) => onUpdateWebPortal(e)}
            label="URL"
            name="link"
          />
          <JMTextField
            onChange={(e: any) => onUpdateWebPortal(e)}
            label="Portal Email"
            name="email"
          />
          <JMTextField
            onChange={(e: any) => onUpdateWebPortal(e)}
            label="Portal Username"
            name="username"
          />
          <JMTextField
            onChange={(e: any) => onUpdateWebPortal(e)}
            type="password"
            label="Portal Password"
            name="password"
          />
        </>
      )}
      <Button variant="contained" onClick={onSubmit}>
        Create Opportunity
      </Button>
    </form>
  );
};
