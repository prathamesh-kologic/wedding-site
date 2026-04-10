import { useEffect, useRef, useState } from "react";
import "./index.css";

export default function App() {
  const path = window.location.pathname;
  if (path.includes("send")) return <SendPage />;
  return <InvitePage />;
}

/* ─── Decorative Components ─── */
const BackgroundArt = () => (
  <>
    <div className="bg-art bg-art-left">
      <img src="/doli_bg.png" alt="Doli Scene" className="bg-art-img" />
    </div>
    <div className="bg-art bg-art-right">
      <img src="/inst_bg.png" alt="Wedding Instruments" className="bg-art-img" />
    </div>
  </>
);

const ArchSVG = ({ flip = false }) => (
  <div className="arch-ornament" style={flip ? { transform: "scaleY(-1)" } : {}}>
    <svg viewBox="0 0 300 44" className="arch-svg" xmlns="http://www.w3.org/2000/svg">
      <path d="M10,40 Q150,2 290,40" stroke="#d4af37" strokeWidth="2.5" fill="none" />
      <circle cx="10" cy="40" r="5" fill="#d4af37" />
      <circle cx="150" cy="8" r="6" fill="#900C3F" />
      <circle cx="290" cy="40" r="5" fill="#d4af37" />
      {[50, 100, 200, 250].map((x) => (
        <circle key={x} cx={x} cy={14 + (Math.abs(x - 150) / 150) * 26} r="3.5" fill="#d4af37" opacity="0.65" />
      ))}
      <path d="M80,24 Q85,18 90,24 Q85,22 80,24Z" fill="#1a6b3c" opacity="0.6" />
      <path d="M210,24 Q215,18 220,24 Q215,22 210,24Z" fill="#1a6b3c" opacity="0.6" />
    </svg>
  </div>
);
const PeacockRow = () => (
  <div className="peacock-row">
    <span className="pc pc-flip">🦚</span>
    <span className="pc-center">🪷</span>
    <span className="pc">🦚</span>
  </div>
);
const FlowerDivider = ({ emoji = "🌸" }) => (
  <div className="flower-divider">
    <div className="flower-line" />
    <span className="flower-center">{emoji}</span>
    <div className="flower-line" />
  </div>
);



const CornerOrnaments = () => (
  <>
    <div className="corner corner-tl">🪷</div>
    <div className="corner corner-tr">🪷</div>
    <div className="corner corner-bl">🪷</div>
    <div className="corner corner-br">🪷</div>
  </>
);

const ScrollReveal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsVisible(entry.isIntersecting);
      });
    }, { threshold: 0.15, rootMargin: "0px" });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div ref={domRef} className={`reveal-on-scroll ${isVisible ? "is-visible" : ""}`}>
      {children}
    </div>
  );
};

const InvitationEntrance = ({ onOpen, guestName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    onOpen();
    setTimeout(() => {
      setIsHidden(true);
    }, 1200);
  };

  if (isHidden) return null;

  return (
    <div className={`entrance-overlay ${isOpen ? "open" : ""}`}>
      <div className="entrance-door left-door"></div>
      <div className="entrance-door right-door"></div>
      <div className="entrance-content">
        {guestName ? (
          <p className="entrance-subtitle">🙏 {guestName} Ji, you are warmly invited</p>
        ) : (
          <p className="entrance-subtitle">You are warmly invited</p>
        )}
        <button onClick={handleOpen} className="open-btn" style={{ marginTop: "20px" }}>
          Open Invitation
        </button>
      </div>
    </div>
  );
};

/* ─── INVITE PAGE ─── */
function InvitePage() {
  const [guestName, setGuestName] = useState("");
  const [view, setView] = useState("bride");
  const [inviteOpened, setInviteOpened] = useState(false);

  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes("groom")) setView("groom");
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    if (name) setGuestName(name);
  }, []);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const brideFirst = view === "bride";

  return (
    <div className="app">
      <InvitationEntrance guestName={guestName} onOpen={() => setInviteOpened(true)} />
      {inviteOpened && (
        <div className="app-content-wrapper">
          <BackgroundArt />

          {/* Marigold garland banner */}
          <div className="garland-banner">
            {"🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼"}
          </div>

          <div className="cards-wrapper">

            {/* ── CARD 1: Cover ── */}
            <div className="card card-cover" ref={card1Ref}>
              <CornerOrnaments />

              <div className="peacock-side peacock-left-side">🦚</div>
              <div className="peacock-side peacock-right-side">🦚</div>

              <ArchSVG />

              <div className="god-names" style={{ fontFamily: "sans-serif", fontSize: "13px", fontWeight: "bold", color: "#123d5e", margin: "10px 0 15px", lineHeight: "1.8" }}>
                {brideFirst ? (
                  <>
                    <span className="telugu-text">|| శ్రీ గణేశాయ నమః ||</span>
                    <br />
                    <span className="telugu-text">|| శ్రీ వెంకటేశ్వర స్వామి ప్రసన్న ||</span>
                  </>
                ) : (
                  <>
                    <span className="marathi-text">|| श्री गणेशाय नमः || </span>
                    <br />
                    <span className="marathi-text">|| श्री रेणुका माता प्रसन्न || </span>

                  </>
                )}
              </div>

              {guestName && (
                <>
                  <div className="guest-box">
                    <p className="guest-label">
                      {brideFirst ? "ప్రియ ఆహ్వానం" : "प्रिय निमंत्रण"}
                    </p>
                    <p className="guest-name">{guestName}</p>
                  </div>
                  <p className="small">Together with your family<br />
                    cordially invite you to the wedding of
                  </p>
                </>
              )}

              <div className="names-container">
                {brideFirst ? (
                  <>
                    <div className="person-box">
                      <h1 className="names">Sanhitha</h1>
                      <p className="parents-text">
                        (Youngest Daughter of
                        Smt. Gangapuram Purnima <br />&amp; Shri. Gangapuram Kishore)
                      </p>
                    </div>
                    <span className="names-and">&amp;</span>
                    <div className="person-box">
                      <h1 className="names">Prathamesh</h1>
                      <p className="parents-text">
                        (Only son of
                        Smt. Varsha Pathak<br />&amp; Shri. Anup Murlidhar Pathak)
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="person-box">
                      <h1 className="names">Prathamesh</h1>
                      <p className="parents-text">
                        (Only son of
                        Smt. Varsha Pathak<br />&amp; Shri. Anup Murlidhar Pathak)
                      </p>
                    </div>
                    <span className="names-and">&amp;</span>
                    <div className="person-box">
                      <h1 className="names">Sanhitha</h1>
                      <p className="parents-text">
                        (Youngest Daughter of
                        Smt. Gangapuram Purnima <br />&amp; Shri. Gangapuram Kishore)
                      </p>
                    </div>
                  </>
                )}
              </div>

              <p className="invite">
                request the honor of your gracious presence<br />
                to celebrate their union
              </p>



              <FlowerDivider emoji="✨" />

              <button id="view-details-btn" className="nav-btn" onClick={() => scrollTo(card2Ref)}>
                View Details ↓
              </button>

              <ArchSVG flip />
            </div>

            {/* ── CARD 2: Details ── */}
            <div className="card card-details" ref={card2Ref}>
              <CornerOrnaments />

              <ArchSVG />



              <FlowerDivider emoji="🌸" />

              <ScrollReveal>
                <section className="event-section">
                  <p className="event-icon">💍💍</p>
                  <p className="event-title">Engagement Ceremony</p>
                  <p className="event-date">Saturday, 9th May 2026</p>
                  <p className="event-time">Muhurat: 4:30 PM</p>
                </section>
              </ScrollReveal>

              <FlowerDivider emoji="🪷" />

              <ScrollReveal>
                <section className="event-section">
                  <p className="event-icon">🪷</p>
                  <p className="event-title">Wedding Ceremony</p>
                  <p className="event-date">Sunday, 10th May 2026</p>
                  <p className="event-time">Muhurat: 6:52 AM</p>
                  <p className="event-time" style={{ fontSize: "11px", marginTop: "8px", lineHeight: "1.5" }}>
                    Parabhava Nama Samvastra, Vishaka Maasa, Krishna Paksha Ashtami,
                    <br />
                    Uttarayana, Vasant Ritu, Dhanishta Nakshatra, Vrashabha Lagna, Brahma Yoga
                  </p>
                  <p className="event-time" style={{ marginTop: "12px", fontWeight: "bold" }}>
                    Lunch follows after wedding
                  </p>
                </section>
              </ScrollReveal>

              <FlowerDivider emoji="🌸" />

              <ScrollReveal>
                <section className="venue-section">
                  <p className="venue-label">📍 Venue</p>
                  <p className="address">Kishor Gardens</p>
                  <p className="address-sub">Burdaguda village, Kagaznagar, Telangana 504296</p>
                </section>
              </ScrollReveal>

              <ScrollReveal>
                <div className="qr-section">
                  <p className="qr-label">Scan for Location</p>
                  <img src="/wedding_location.png" className="qr" alt="Location QR Code" />
                </div>
              </ScrollReveal>

              <PeacockRow />

              <button id="back-to-invite-btn" className="nav-btn back-btn" onClick={() => scrollTo(card1Ref)}>
                ↑ Back to Invitation
              </button>

              <ArchSVG flip />
            </div>

          </div>

          {/* Bottom garland */}
          <div className="garland-banner">
            {"🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼"}
          </div>


        </div>
      )}
    </div>
  );
}

/* ─── SEND PAGE ─── */
function SendPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [view, setView] = useState("bride");

  const generateLink = () => {
    const base = window.location.origin;
    const cleanName = name ? name.trim() : "";
    return cleanName ? `${base}/${view}?name=${encodeURIComponent(cleanName)}` : `${base}/${view}`;
  };

  const getMessageText = () => {
    const link = generateLink();
    const cleanName = name ? name.trim() : "";
    const displayName = cleanName ? cleanName : "Guest";
    return `Dear ${displayName},\n\nWe warmly invite you to celebrate our wedding with us.\n\n💍 Engagement: May 9, 2026\n🪷 Wedding: May 10, 2026\n\nPlease find your invitation here:\n${link}`;
  };

  const sendInvite = () => {
    const message = getMessageText();
    window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="send-page">
      <div className="garland-banner">
        {"🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼"}
      </div>

      <div className="send-card">
        <ArchSVG />

        <div className="send-header">
          <span>🦚</span>
          <h2>Send Invitation</h2>
          <span>🦚</span>
        </div>

        <FlowerDivider emoji="💌" />

        <div className="toggle">
          <button id="bride-toggle-btn" className={view === "bride" ? "active" : ""} onClick={() => setView("bride")}>
            Bride's Side
          </button>
          <button id="groom-toggle-btn" className={view === "groom" ? "active" : ""} onClick={() => setView("groom")}>
            Groom's Side
          </button>
        </div>

        <div className="input-group">
          <label htmlFor="guest-name-input">Guest Name</label>
          <input
            id="guest-name-input"
            placeholder="e.g. Ramesh"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="phone-input">WhatsApp Number</label>
          <input
            id="phone-input"
            placeholder="10-digit number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button id="send-whatsapp-btn" className="wa-btn" onClick={sendInvite}>
          🟢&nbsp; Send via WhatsApp
        </button>

        <div className="preview" style={{ marginTop: "20px" }}>
          <p className="preview-label">🔗 Invite Message Preview</p>
          <textarea
            readOnly
            value={getMessageText()}
            style={{ width: "100%", height: "160px", padding: "10px", fontSize: "13px", fontFamily: "inherit", borderRadius: "8px", border: "1px solid #d4af37", background: "rgba(255,255,255,0.7)", color: "#164360", outline: "none" }}
          />
        </div>

        <ArchSVG flip />
      </div>

      <div className="garland-banner">
        {"🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼"}
      </div>
    </div>
  );
}