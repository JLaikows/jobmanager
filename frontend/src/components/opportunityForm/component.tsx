import { FC, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import * as _ from 'lodash';
import { TAddress, TOpportunity } from '../../types/opportunity';

interface IAuth {
  createOpportunity: (opportunity: any) => void;
  opportunity?: TOpportunity;
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
  <div
    style={{
      padding: '2% 0%',
      width: '100%',
      display: 'flex',
      justifyContent: 'left',
    }}
  >
    <TextField {...props} fullWidth></TextField>
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
  const [isRemote, setIsRemote] = useState<boolean>(false);
  const [addressInfo, setAddressInfo] = useState<TAddress>(
    opportunity?.address ?? {
      street: '',
      apt: '',
      city: '',
      region: '',
      postalCode: '',
      country: '',
      hybrid: false,
    },
  );
  const [isLoading, setIsLoading] = useState(false);

  const onUpdate = (e: any) => {
    setOpportunityInfo({ ...opportunityInfo, [e.target.name]: e.target.value });
  };

  const onUpdateWebPortal = (e: any) => {
    setWebPortalInfo({ ...webPortalInfo, [e.target.name]: e.target.value });
  };

  const onUpdateAddress = (e: any) => {
    setAddressInfo({ ...addressInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await createOpportunity({
        ...opportunityInfo,
        salary: salaryInfo,
        hours: hoursInfo,
        address: addressInfo,
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
  const addressForm = (
    <>
      <JMTextField
        onChange={(e: any) => onUpdateAddress(e)}
        label="Street"
        name="street"
      />
      <JMTextField
        onChange={(e: any) => onUpdateAddress(e)}
        label="Street #2"
        name="apt"
      />
      <JMTextField
        onChange={(e: any) => onUpdateAddress(e)}
        label="City"
        name="city"
      />
      <JMTextField
        onChange={(e: any) => onUpdateAddress(e)}
        label="Region"
        name="region"
      />
      <JMTextField
        onChange={(e: any) => onUpdateAddress(e)}
        label="Postal Code"
        name="postalCode"
      />
      <JMTextField
        onChange={(e: any) => onUpdateAddress(e)}
        label="Country"
        name="country"
      />
      <FormControlLabel
        control={<Checkbox onChange={(e: any) => onUpdateAddress(e)} />}
        label="is Hybrid"
        name="hybrid"
        value={addressInfo.hybrid}
      />
    </>
  );

  const webPortalForm = (
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
        justifyContent: 'left',
        transitionDuration: '1s',
      }}
    >
      <div
        style={{
          padding: '2% 0%',
          width: '100%',
          display: 'flex',
          justifyContent: 'left',
        }}
      >
        <Typography variant="h5" color="secondary">
          Create An Opportunity
        </Typography>
      </div>
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
      {hasWebPortal && webPortalForm}
      <FormControlLabel
        control={<Checkbox onChange={() => setIsRemote(!isRemote)} />}
        label="Remote"
        value={isRemote}
      />
      {!isRemote && addressForm}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button variant="contained" onClick={onSubmit}>
          Create Opportunity
        </Button>
        <Button variant="outlined">Cancel</Button>
      </div>
    </form>
  );
};
