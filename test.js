  // On submit handeler for update user
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const updateData = new FormData();
    updateData.append("name", name);
    updateData.append("email", email);
    updateData.append("avatar", selectedImage);

    try {
      await dispatch(updateUserProfile(updateData)).unwrap();
      dispatch(loadUserDetails());
    } catch (error) {
      console.log(error);
    }
  };