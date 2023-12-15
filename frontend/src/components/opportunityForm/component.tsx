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
  onClose?: () => void;
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
  onClose,
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

  const updateSalaryInfo = (e: any) => {
    setSalaryInfo({ ...salaryInfo, [e.target.name]: Number(e.target.value) });
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
      // window.location.href = 'http://localhost:3000/';
    } catch {}
    setIsLoading(false);
    onClose && onClose();
  };

  const hourlyCheckbox = (
    <InputAdornment position="end">
      <Checkbox
        value={salaryInfo.hourly}
        onChange={() =>
          setSalaryInfo({ ...salaryInfo, hourly: !salaryInfo.hourly })
        }
        title="Hourly"
      />
      <InputLabel>Hourly</InputLabel>
    </InputAdornment>
  );
  const fullTimeCheckbox = (
    <InputAdornment position="end">
      <Checkbox
        value={salaryInfo.hourly}
        onChange={() =>
          setHoursInfo({ ...hoursInfo, fullTime: !hoursInfo.fullTime })
        }
        title="Full Time"
      />
      <InputLabel>FullTime</InputLabel>
    </InputAdornment>
  );
  const addressForm = (
    <>
      <JMTextField onChange={onUpdateAddress} label="Street" name="street" />
      <JMTextField onChange={onUpdateAddress} label="Street #2" name="apt" />
      <JMTextField onChange={onUpdateAddress} label="City" name="city" />
      <JMTextField onChange={onUpdateAddress} label="Region" name="region" />
      <JMTextField
        onChange={onUpdateAddress}
        label="Postal Code"
        name="postalCode"
      />
      <JMTextField onChange={onUpdateAddress} label="Country" name="country" />
      <FormControlLabel
        control={<Checkbox onChange={onUpdateAddress} />}
        label="is Hybrid"
        name="hybrid"
        value={addressInfo.hybrid}
      />
    </>
  );

  const webPortalForm = (
    <>
      <JMTextField onChange={onUpdateWebPortal} label="URL" name="link" />
      <JMTextField
        onChange={onUpdateWebPortal}
        label="Portal Email"
        name="email"
      />
      <JMTextField
        onChange={onUpdateWebPortal}
        label="Portal Username"
        name="username"
      />
      <JMTextField
        onChange={onUpdateWebPortal}
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
      <JMTextField onChange={onUpdate} label="Company Name" name="company" />
      <JMTextField onChange={onUpdate} label="Title" name="title" />
      <JMTextField
        onChange={(e: any) =>
          setSalaryInfo({ ...salaryInfo, amount: Number(e.target.value) })
        }
        label="Salary"
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
          endAdornment: hourlyCheckbox,
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
          endAdornment: fullTimeCheckbox,
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
      {!isRemote ? addressForm : null}
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button variant="contained" onClick={onSubmit}>
          Create Opportunity
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </form>
  );
};
