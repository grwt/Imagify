const generateImage = async (prompt) => {
  try {
    const { data } = await axios.post(
      backendUrl + '/api/image/generate-image',
      { prompt },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (data.success) {
      loadCreditsData();
      return data.resultImage;
    } else {
      toast.error(data.message);
      loadCreditsData();

      if (data.creditBalance === 0) {
        return { error: true, reason: 'no_credits' };
      }
      return { error: true, reason: 'failed' };
    }

  } catch (error) {
    toast.error(error.message);
    return { error: true, reason: 'exception' };
  }
};
