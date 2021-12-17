import { Form } from '@/components/Form/Form';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Button, Container, Paper, Stack, styled, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { CreateProjectDTO, useAddProject } from '../api/createProject';
import { Controller, useForm } from 'react-hook-form';
import useMediaQuery from '@mui/material/useMediaQuery';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ProjectDataService from '../api/ProjectService';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useTheme } from '@mui/material/styles';

// CHANGE TO MODAL FULL SCREEN DIALOG
// MAKE SURE REACT-QUERY WORKS
// https://mui.com/components/dialogs/#responsive-full-screen

const Item = styled(Paper)({
  padding: 8,
  textAlign: 'center',
});
const ButtonProject = styled(Button)({
  padding: 16,
  margin: 10,
  textAlign: 'center',
});

export default function AddProject() {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [targetEndDate, setTargetEndDate] = React.useState<Date | null>(null);
  const [actualEndDate, setActualEndDate] = React.useState<Date | null>(null);

  const theme = useTheme();
  
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values: any) => {
    await addProjectMutation.mutateAsync({ data: values });
    console.log(values);
  };

  const ProjectButtons = styled(Button)({
    padding: 10,
    margin: 6,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addProjectMutation = useAddProject();

  return (
    <Container>
      <ProjectButtons onClick={handleOpen} variant="outlined" startIcon={<AccountTreeIcon />}>
        Add Project
      </ProjectButtons>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
        {"Add Project"}
        </DialogTitle>
        <DialogContent>
      <Box>
        <Stack spacing={2}>
          <Item elevation={1}>
            <h1>Project Details</h1>
          </Item>
          <Form<CreateProjectDTO['data']> id="add-project" onSubmit={handleSubmit(onSubmit)}>
            <Item elevation={0}>
              <TextField
                {...register('projectName', { required: 'Project name is required' })}
                fullWidth
                id="projectName"
                label="Project Name"
                variant="outlined"
                error={errors?.projectName}
                helperText={errors.projectName?.message}
              />
            </Item>
            <Item elevation={0}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={startDate}
                  render={({ field: { ref, ...rest } }) => (
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(startDate1: React.SetStateAction<Date | null>) => {
                        setStartDate(startDate1);
                        setValue('startDate', startDate1, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      renderInput={(params) => <TextField fullWidth {...params} />}
                    />
                  )}
                />
              </LocalizationProvider>
            </Item>
            <Item elevation={0}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  name="targetEndDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { ref, ...rest } }) => (
                    <DatePicker
                      label="Target End Date"
                      value={targetEndDate}
                      minDate={startDate}
                      onChange={(targetEndDate1: React.SetStateAction<Date | null>) => {
                        setTargetEndDate(targetEndDate1);
                        setValue('targetEndDate', targetEndDate1, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      renderInput={(params) => <TextField fullWidth {...params} />}
                    />
                  )}
                />
                <Typography variant="caption" color="error">
                  <Box sx={{ textAlign: 'left', margin: '10x' }}>
                    {errors.targetEndDate &&
                      errors.targetEndDate.type === 'required' &&
                      'Please enter a target end date!'}
                  </Box>
                </Typography>
              </LocalizationProvider>
            </Item>
            <Item elevation={0}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Actual End Date"
                  minDate={targetEndDate}
                  value={actualEndDate}
                  onChange={(actualEndDate1: React.SetStateAction<Date | null>) => {
                    setActualEndDate(actualEndDate1);
                    setValue('actualEndDate', actualEndDate1, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Item>
            <Item elevation={0}>
              <ButtonProject variant="contained" type="submit">
                Create
              </ButtonProject>{' '}
              {/* <ButtonProject variant="outlined">Cancel</ButtonProject> */}
            </Item>
          </Form>
        </Stack>
      </Box>
      </DialogContent>
        <DialogActions>
          <Button autoFocus type="submit" onClick={handleClose}>
            Add
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
