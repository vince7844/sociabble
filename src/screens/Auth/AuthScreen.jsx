import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "./AuthStyle.scss";
import { useNavigate, useLocation } from 'react-router-dom';
import { defaultColors } from '../../assets/colors/default-colors';

//A15F63LNW4UTlgXOa5neFWmVNnt_xT_lhCBeOm0nHR6Z_h12_S5u1tw81yG742Z7HNOv6FeJYOl6fHEQprboLfTrtXxQ9OfYXKeXp-ESTp6T7GjGcXz9_kIjzXmuy0-acDBaEW6MUGQVxe8LBnpA8uQYs0_9E3QyJILmYDCYWG7roKrvfgAN0it8fCKMuRua_ErkcuImD32difRxlNnXj2N3KkTEBXjQIuXhKTyiZUrfZH21Bx7OJxYvmd53aCsefcSj3DZfKaQOR5E_JzwfI1BIpoMXbbuy0gS0jBbp8Y7AHTAVmEp2S-2GpLYKX3QuhoeR8Lk85N7p-CDhqaU9g86zgpoprEV9kiPLvMd_CtTqy8Svo84CslBCvcvHIfjzYrFox8NjL-GLlXRPjMwSHzm7RKs_kTVdBQQ3d4GaAMVd2UzINkpu27Fmr5OxLYPKepi5mLgRsi3VVraOWPxUAtAbt7Pg9talH5McOr0Ys-b3-RWmi6XFUDqtKGoIB5CA4OpOcNMNS5MStT02CptEaEHRCYBFp21EhZTbhYDlAJJI9QLcreApgMDV3lYDfwHkE1z6jNt_7XTzmefdHTSB3iPGs6JaeScw4thoFwectoyAXfjAxKE_gFP9wXQAaAUwa8YrRWti70UuVQ15BgHDft4zh2xxIPUp3nd9Qu1omXAkQ75WLdD5WhADk4pxK2DUtg-G1C0GiAhqM2P-R1x4PQV5Sxc2iYjGNDb3Lrh-8fNw8QSCz9UwTVLfCf1O_lz4k-RSKIq_KT3Uy_Eboo_JMHixI3nAoM9fLAqPk4N-pgeg0EN97S39iqlOLgTaN2q71R1H8jpN9ngUnw2aBpAo7yHWmrp3_i4NE_cRl3QdUgE_Yq-e
const CHANNEL_ID = "MySociabble"
const apiUrl = `Api/1_0/posts/Channel/${CHANNEL_ID}?count=36`

const Auth = () => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();
  const [posts, setPosts] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false)
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const sociabble_API = await axios.get(apiUrl, { 
        headers: {
          "X-Sociabble-Device": "app",
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        }})
      console.log("RETOUR API = ", sociabble_API.data)
      const dataAPI = sociabble_API.data
      setPosts(dataAPI.Posts)
    } catch (e) {
      console.error(e.message)
      setError(true)
    }

    setLoading(false)
    error && errorMessage && setErrorMessage(false)
  }

  const closeErrorMessage = () => {
    setErrorMessage(!errorMessage)
  }

  useEffect(() => {
    posts && !loading && navigate('/home', { state: { dataPosts : posts } }) 
  }, [posts, loading, navigate]);

  return (
    <div className="auth-screen" style={{ backgroundColor: defaultColors.backgroundBlue }}>
      <div className="form-signin">
        <div className="form-with-error">
          <form className="container p-0" onSubmit={submit}>
            <h1 className="h3 fw-normal pb-3 text-white">Authentification</h1>
            <div className="text-center p-5 bg-white shadow-sm">
              <div className="form-floating">
                <input type="text" className="form-control bg-light" id="floatingToken" 
                      placeholder="Token" 
                      onChange={e => setToken(e.target.value)} 
                      required />
                <label htmlFor="floatingToken">Token</label>
              </div>
              <button className="btn btn-lg btn-primary mt-3" type="submit">Login</button>
              { loading && <div className="spinner-border text-primary" role="status"></div> }
            </div>
          </form>
          { error && 
            <div style={{ display: errorMessage ? "none" : "block" }}>
              <div className="alert alert-danger alert-dismissible mt-3">
                <strong>Erreur !</strong> Mauvais token ou aucune connexion internet 
                <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={closeErrorMessage}></button>
              </div> 
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Auth;