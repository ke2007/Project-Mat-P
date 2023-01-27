import { useState } from "react";
import styled from "styled-components";
import useAxios from "../../hooks/useAxios";
import { deletePickers } from "../../api/axiosAPI/groups/PickersAxios";

const ModalContainer = styled.div`
  height: 100%;
  width: calc(1340px * 2 / 5 - 63px);
  z-index: 1000;
`;

const Backdrop = styled.div`
  top: 0;
  left: 0;
  width: calc(1340px * 2 / 5 - 63px);
  height: 100vh;
  position: fixed;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.2);
`;

const DialogBox = styled.dialog`
  top: 400px;
  left: 79px;
  margin: 0;
  width: 370px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: white;
  position: fixed;
  z-index: 10020;
  h3 {
    color: #c65d7b;
    font-size: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 40px;
  button {
    background-color: #fff;
    cursor: pointer;
    font-size: 20px;
    margin: 0 20px;
    border: none;
  }
`;

interface ModalDefaultType {
  getAllPickers: () => void;
  onClickToggleModal: () => void;
  id: number;
}

const MatPickerDelete = ({ getAllPickers, onClickToggleModal, id }: ModalDefaultType) => {
  const [deleteClicked, setDeleteClicked] = useState<boolean>(false);

  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClickToggleModal) {
      onClickToggleModal();
    }
  };

  const { axiosData } = useAxios(() => deletePickers(id), [deleteClicked], true);

  const handleMatPickDelete = () => {
    setDeleteClicked(!deleteClicked);
    axiosData();
    getAllPickers();
    onClickToggleModal();
  };

  return (
    <ModalContainer>
      <DialogBox>
        정말 삭제하시겠습니까?
        <ButtonContainer>
          <button onClick={handleMatPickDelete}>예</button>
          <button onClick={closeModal}>아니오</button>
        </ButtonContainer>
      </DialogBox>
      <Backdrop onClick={closeModal} />
    </ModalContainer>
  );
};

export default MatPickerDelete;
