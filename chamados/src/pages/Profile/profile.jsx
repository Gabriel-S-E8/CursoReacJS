import React, { useContext, useState } from "react";
import Header from "../../components/Header/header";
import Title from "../../components/Title/title";

import { AuthContext } from "../../Contexts/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../db/firebaseConnection";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import "./profile.css";
import { FiSettings, FiUpload } from "react-icons/fi";
import avatar from "../../assets/avatar.png";
import { toast } from "react-toastify";

export default function Profile() {
  const { user, storageUser, setUser, logout } = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imgAvatar, setImgAvatar] = useState(null);

  const [name, setName] = useState(user && user.nome);
  // eslint-disable-next-line
  const [email, setEmail] = useState(user && user.email);

  const handleFile = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        setImgAvatar(image);
        setAvatarUrl(URL.createObjectURL(image));
      } else {
        toast.error("Envie uma imagem do tipo PNG ou JPG");
        setImgAvatar(null);
        return;
      }
    }
  };

  const handleUpload = () => {
    const currentUid = user.uid;
    const oldUser = user.name;

    const uploadRef = ref(storage, `images/${currentUid}/${imgAvatar.name}`);

    // eslint-disable-next-line
    const uploadTask = uploadBytes(uploadRef, imgAvatar)
    .then((snapshot) => {

        getDownloadURL(snapshot.ref).then(async (url) => {
            let urlPhoto = url;

            const docRef = doc(db, "users", currentUid);
            await updateDoc(docRef, {
                avatarUrl: urlPhoto,
                name: name,
            })
            .then(() => {
                let data = {
                    ...user,
                    avatarUrl: urlPhoto,
                    nome: name,
                };

                setUser(data);
                storageUser(data);
                toast.success("Imagem alterada com sucesso! 🎯");
                if (oldUser !== name) {
                    toast.success("Nome alterado com sucesso! 🎯");
                }
            })
        })

    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imgAvatar === null && name !== "") {
      // atualizar apenas o nome
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        name: name,
      })
        .then(() => {
          let data = {
            ...user,
            nome: name,
          };

          setUser(data);
          storageUser(data);
          toast.success("Nome alterado com sucesso! 🎯");
        })
        .catch((error) => {
          console.log("Erro ao atualizar" + error);
          toast.error("Erro ao atualizar 😰");
        });
    } else if (name !== "" && imgAvatar !== null) {
      // atualizar nome e imagem
      handleUpload();
    }else{
        if(name === ""){
            toast.error("Nome obrigatório 😰");
        }
    }
  };

  return (
    <div>
      <Header />
      <div className="content">
        <Title Title="Profile">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSubmit}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#fff" size={25} />
              </span>
              <input type="file" accept="image/*" onChange={handleFile} />{" "}
              <br />
              {avatarUrl == null ? (
                <img
                  src={avatar}
                  alt="Foto do perfil"
                  width={250}
                  height={250}
                />
              ) : (
                <img
                  src={avatarUrl}
                  alt="Foto do perfil"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <label>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>E-mail</label>
            <input type="text" value={email} disabled={true} />

            <button type="submit">Salvar</button>
          </form>
        </div>

        <div className="container">
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
