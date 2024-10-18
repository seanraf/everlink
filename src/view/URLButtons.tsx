import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import {
  Box,
  TextField,
  InputLabel,
  Grid2,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { DraggableItemProps, UrlButton, URLButtonsProps } from '@/types';

const styles = {
  dragIcon: { display: 'flex', mt: '37px' },
  textField: {
    mt: 1,
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#F8F8F8',
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
      '& fieldset': {
        borderColor: '#CBD2E0',
        borderRadius: '8px',
      },
      '&:hover fieldset': {
        borderColor: '#CBD2E0',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#CBD2E0',
      },
    },
  },
  dragItemOuterBox: {
    display: 'flex',
    width: '100%',
    gap: 1,
  },
  addButtonBox: {
    display: 'flex',
    justifyContent: 'end',
    mt: 2,
    cursor: 'pointer',
  },
  addRoundedIcon: {
    width: '20px',
    height: '20px',
    my: 'auto',
    color: 'text.secondary',
  },
  addButton: {
    fontSize: { sm: 16, xs: 14 },
    fontWeight: 'bold',
    color: 'text.secondary',
  },
  inputLabel: {
    color: 'text.secondary',
    fontWeight: 500,
  },
};
const DraggableItem: React.FC<DraggableItemProps> = ({
  button,
  index,
  moveButton,
  handleInputChange,
  handleDelete,
  error,
  urlButtonsLength,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const [, drag] = useDrag({
    type: 'button',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'button',
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveButton(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const dragDropRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        drag(node);
        drop(node);
      }
    },
    [drag, drop]
  );

  return (
    <Box ref={dragDropRef} sx={styles.dragItemOuterBox}>
      <Box sx={styles.dragIcon}>
        <Image src={'/DragIcon.svg'} alt='Drag Icon' height={45} width={12} />
      </Box>
      <Box width={'100%'}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ md: 6, xs: 12 }}>
            <Box>
              <InputLabel
                htmlFor='input-with-icon-adornment'
                sx={{ ...styles.inputLabel, mt: 2 }}
              >
                Button Label
              </InputLabel>
              <TextField
                InputProps={{
                  inputProps: {
                    style: {
                      padding: '0 10px',
                      height: '48px',
                      width: '100%',
                      backgroundColor: '#F8F8F8',
                    },
                  },
                }}
                sx={styles.textField}
                value={button.title}
                onChange={(e) => handleInputChange(e, index, 'title')}
                required
                fullWidth
                id='outlined-basic'
                variant='outlined'
                error={!!error.title}
                helperText={error.title}
              />
            </Box>
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
            <Box>
              <InputLabel
                htmlFor='input-with-icon-adornment'
                sx={{
                  ...styles.inputLabel,
                  mt: { md: 2, xs: 0 },
                }}
              >
                URL
              </InputLabel>
              <Box
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ position: 'relative', width: '100%' }}
              >
                <TextField
                  InputProps={{
                    inputProps: {
                      style: {
                        padding: '0 10px',
                        height: '48px',
                        width: '100%',
                        backgroundColor: '#F8F8F8',
                      },
                    },

                    endAdornment: (
                      <InputAdornment
                        position='end'
                        sx={{
                          display: urlButtonsLength === 1 ? 'none' : 'flex',
                        }}
                      >
                        <IconButton
                          edge='end'
                          sx={{
                            color: 'red',
                            visibility: isHovered ? 'visible' : 'hidden',
                          }}
                          onClick={() => handleDelete(index)}
                        >
                          <Image
                            src={'/DeleteIcon.svg'}
                            alt='Delete'
                            width={24}
                            height={24}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={styles.textField}
                  value={button.url}
                  onChange={(e) => handleInputChange(e, index, 'url')}
                  required
                  fullWidth
                  id='outlined-basic'
                  variant='outlined'
                  error={!!error.url}
                  helperText={error.url}
                />
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

const URLButtons: React.FC<URLButtonsProps> = ({
  urlButtons,
  setUrlButtons,
  urlButtonErrors,
  setUrlButtonErrors,
}: URLButtonsProps) => {
  const addButton = () => {
    const newButton: UrlButton = {
      id: `${urlButtons.length + 1}`,
      title: '',
      url: '',
    };
    setUrlButtons([...urlButtons, newButton]);
    setUrlButtonErrors([...urlButtonErrors, { id: '', title: '', url: '' }]);
  };

  const moveButton = (fromIndex: number, toIndex: number) => {
    const updatedButtons = [...urlButtons];
    const [movedButton] = updatedButtons.splice(fromIndex, 1);
    updatedButtons.splice(toIndex, 0, movedButton);
    setUrlButtons(updatedButtons);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: string
  ) => {
    const updatedButtons = [...urlButtons];
    updatedButtons[index] = {
      ...updatedButtons[index],
      [field]: e.target.value,
    };
    setUrlButtons(updatedButtons);
  };

  const handleDelete = (index: number) => {
    const updatedButtons = urlButtons.filter((_, i) => i !== index);
    const updatedErrors = urlButtonErrors.filter((_, i) => i !== index);
    setUrlButtons(updatedButtons);
    setUrlButtonErrors(updatedErrors);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box>
        {urlButtons.map((button, index) => (
          <DraggableItem
            key={button?.id}
            index={index}
            button={button}
            moveButton={moveButton}
            handleInputChange={handleInputChange}
            handleDelete={handleDelete}
            error={urlButtonErrors[index]}
            urlButtonsLength={urlButtons?.length}
          />
        ))}
      </Box>
      <Box color='primary' onClick={addButton} sx={styles.addButtonBox}>
        <AddRoundedIcon sx={styles.addRoundedIcon} />
        <Typography sx={styles.addButton}>Add Button</Typography>
      </Box>
    </DndProvider>
  );
};

export default URLButtons;
