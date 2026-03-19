function ProfilePage() {
  const topArtists = [
    { id: 1, name: 'Luna Solari', genre: 'Electronic', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqVm1jOPcle3PIuovJtI_jKW8FFol1Zc8BBp83FZDYUQyZXwGgfyWDXq9irXmWvybWlCrl_no-PS8M5hlZeDKdbimcRsv18qe_9f77vEAkMT9M6Vy_-YKvNMoJ1kSLc4Zm7j9DgR5mZvO2QIG3BWPaC9hOfacvP4r5OKhG_quUGQCr9iEuVQeerRbul-EdRB1Mi6o5ujw2EzfTQp1zl6QAk0aRLAVu_yJnVGSrnwBzpVkA9_rfmU_wJVJZIFZi-dr4Pf9Tid8risCc' },
    { id: 2, name: 'Vortex Wave', genre: 'Synthwave', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIoY71v6jomz52HMGxw2DkB0qX-askVtDmcUKt6Sx240jotrRYW0llpbnkdwyfC-mNH5JYQUexNnOQI9GgJVWcC8PR-IKSnzZMWTFGNTIoPpXOwQmgigOKVyb-Dy5fzPHhO7sanHcmvkxqEC6yFEWJJaq9oiKP6fkwwpD7yoZM5pij12prVteuR29qJDFZLYM_rQ4teSCooq5SSumDHuYALwSApRx9VdW2JBStR4xQdXGRVo91gDahlx4Ai-d3Sl098gfUlLwGHQ6p' },
    { id: 3, name: 'Echo Park', genre: 'Indie Pop', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEDPyE-MFunieR6QUEmRNWVvx3_D5AoZFPCgCKQei3WNatJNDxr1MOs84E0ZjE87b7Z8O9QS8apWu6RKVUa9MspAPzZaEKpSd_-6ZBMuFkZvVgVnA2qOCbzAErP79aDIFiaaFlBWg3TNsYnp1yb37sJKNk7FFeEdwMoWVknV6wWrndNxxH1dv7zbAjIxTH3HoQVDXSptFZefYrxrnNuSLE4j9gbb5w8b3jKbcRlXR_1y2-AzAIlXWMDqROyo2dW0J2g0wAA8pa2LSh' },
    { id: 4, name: 'System Error', genre: 'Techno', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAo35z0rjX3pNhSV16ngcM7zZQpAw1SAo8nrp6rHLY81vkWFcgI3UDVnNNDwiTvbfRvWtA4yJzXJraaP_FEpVYML1mRCvrhT0alvCbZ-ugJsPBlqHRWPxCFqPwYn87qFI9ETn72NgHKDIruc3Z9YnHoYHTS9VU2V0c2wMzzSDQQU9imOO8gk0zFzDxCpz-Ptq_bjolz36J2Bx7-kLT0FGLSeFXcKe3nsRUciV6z-J9Arr-e_D8g9zNk848ejkNp6V123KK9nxVcr5h' },
    { id: 5, name: 'The Void', genre: 'Post-Rock', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0VPnb4svbApF3T9f4geERTUJeZNt1HaAbUtgT3IYrpDQ925PKsaRr7cW0lCZGy5SWK2Xr0ofkAeCyGsSsUj9wZMBf1gkQkFdICSilFYAEgAhN_Ov51yyMRx3ndVBJozyXSTwX4gqwLh6kAqSDtB9pdjz-7D6zlc74AToIIebdtRqxV2fjTPPVJk7ZaNzJamMtjK8XIpVYjEi3eKi8zW_T3n8-ydMagXiAchc31byQFXfTVpaGOvOuqfwomtcu58KJsF7anIGBdU8R' },
    { id: 6, name: 'Amber Sky', genre: 'Neo-Soul', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeDEkP1X1u4Ns3Q9UXYifZaHxWMh1GxDzWv4uAi-w6XW1j4OoVGhOjqy0w2tJutTHGW0-wU4N4b3eraDJAmRUf1mkdLnl19gQPzuQy-XLnQKki718jbK6i5o0CBcxeTh0D0Ph0n2jNDEMrrwTl_nnsOSt3XIOmZSXZS-_i_ZQ-aUPxciPWTb8zWOLgZFYGwhyhIYCAC1DjceEZ28NNp3WFaU_bOCmVhVbDyPa3Hc9TymA8irwNbtvD250UUEXF4TSl1B9vvPf_ZgF1' }
  ];

  const recentlyPlayed = [
    {
      id: 1,
      title: 'Neon Nights',
      subtitle: 'Vortex Wave • Album',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCAMyg09bh_xy02bKdGR3h95Fq_pfQxRHQ18STqX_SEBNVhQO9r6dLAoeav9f_z0CJTGZE8PX3fmB1v-z-DBoK9Jv3omkRnuI8zcEATgie9iJ6D2Tr2EGevjVUybd4psR18o9vf0UnTwd8vfdrW2OAXHgiz1GOqNsf7odBEZ2ckveLl1nM0nw29Gom4Pyopd5PhyZhK3YffcPqI2xcNzAF6MfbSO-kuPHAAgtRtyUL6haSDD4sqYkrG3CcoqwTLsCjoU3UAwj14xyD'
    },
    {
      id: 2,
      title: 'After Hours',
      subtitle: 'Luna Solari • Single',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEWEvmrUHUu9K9B465gx-3PRuHUulIEi2q-fwNfed0A-g5UtYk2c12nUP2Q6iJynKwR2N7zhOQ7b1lsuHl1unNuXua1xvsH5YpB17FUD7WGkC_31ajPPQSjB0LffiKAXEILsFd_RP0A2JnltRnSggOYttWsVXhy_tN2tS4Qa4YG6UkdSD5xVlHba_C51NAXv-GoyS5boh6Gh7R-AkZhycBqUNR55HX4Ps3GET1tJesg3hjyVseMEtVT4PlqKhGS6bwN-LQSyDnn-gT'
    },
    {
      id: 3,
      title: 'Live in London',
      subtitle: 'The Void • Live Album',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB34BMSDhD2UpmIu0eoJ_PlC5bh_nZ_l8Y1P-xtj01vJi-IEfDt_HGc8x5wiXP78c0I__444SY1XEujmhTKiXdzX-QO16lWHvFgXa1vXX6ZqXtoAZEEnfoxq1mLNZcVATpx6myNImmQRpy2LrwB2DDUQuVC4d3LPnHk5IHTnLn7db4Md6LNArCdcA3Z_5pTgFpNSGIsd_ORACNi5qNVX60lUwLzd_tR9amjQA4GoqbdCv-WS-q-arscDcNtAnJb4ryUeXo_tQZlE9tf'
    }
  ];

  return (
    <div className="page profile-page">
      <section className="profile-hero">
        <div className="profile-avatar-large">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQYsIJg2d1lo1phhElzDz-ZMkIJcEG_f7bZaoFD6nxsrNHauN90MtEzssQfhTa62oQxbVIKfIzO6x70e6BZfe8fAPpVtfdOVHuJqmjHahTHkjLsnXP2UTYcTeE0s7b-ZHELK0gtJOIs_-pW2kNX4Ulx7XcYZrJwShyEcFJ4GWwD2vdZYOC0w7t_rJMcGu8B7OxQv3cfpOa_5py5Q2smvzEd4gshO58qsFpmCNfaiwMsZzo-R50z1zTITmjsMW3oDIsJt-9LEC_WQhf"
            alt="Alex Rivera"
          />
        </div>
        <div className="profile-info">
          <span className="profile-badge">PRO MEMBER</span>
          <h2>Alex Rivera</h2>
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">1,248</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat">
              <span className="stat-value">412</span>
              <span className="stat-label">Following</span>
            </div>
            <div className="stat">
              <span className="stat-value">18</span>
              <span className="stat-label">Playlists</span>
            </div>
          </div>
          <div className="profile-actions">
            <button className="btn btn-primary">Follow</button>
            <button className="icon-btn-more">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-header">
          <div className="section-title">
            <h3>
              Top Artists <span style={{ fontWeight: 500, color: 'var(--on-surface-variant)' }}>this month</span>
            </h3>
          </div>
          <button className="view-all">View All</button>
        </div>
        <div className="artists-grid">
          {topArtists.map((artist) => (
            <div key={artist.id} className="artist-item">
              <div className="artist-image">
                <img src={artist.image} alt={artist.name} />
              </div>
              <h4>{artist.name}</h4>
              <p>{artist.genre}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-header">
          <div className="section-title">
            <h3>Recently Played</h3>
          </div>
          <button className="view-all">View History</button>
        </div>
        <div className="recently-played-grid">
          {recentlyPlayed.map((item) => (
            <div key={item.id} className="recent-item">
              <div className="recent-art">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="recent-info">
                <h4>{item.title}</h4>
                <p>{item.subtitle}</p>
              </div>
              <button className="play-btn-small">
                <span className="material-symbols-outlined filled">play_arrow</span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;
