// product-modal.js — simple modal for product details
const PRODUCT_DETAILS = {
  compressor: {
    name: 'TitanPro Industrial Air Compressor',
    image: 'assets/images/products/air-compressor.jpg',
    price: 'From R45,000',
    long: 'The TitanPro Industrial Air Compressor combines industry-leading efficiency with heavy-duty durability to power demanding industrial operations. Designed for continuous duty, it features low-noise operation, simplified maintenance access and advanced cooling to maximise uptime. Ideal for workshops, plants and mining sites seeking reliable compressed air with lower lifecycle costs.'
  },
  conveyor: {
    name: 'Streamline Conveyor System',
    image: 'assets/images/products/conveyor-belt-system.jpg',
    price: 'Custom Quote',
    long: 'Streamline Conveyor Systems deliver modular, scalable solutions for efficient material transport across industrial sites. With precision rollers, durable belt compounds and easy-access maintenance points, Streamline reduces downtime and simplifies integration into existing operations. Customisable lengths and load ratings make it ideal for mining, processing and manufacturing facilities.'
  },
  generator: {
    name: 'EnduroMax Industrial Generator',
    image: 'assets/images/products/industrial-generator.jpg',
    price: 'From R85,000',
    long: 'EnduroMax generators provide proven, fuel-efficient standby and prime power capabilities from 10–500 kVA. Built with heavy-duty engines, advanced control electronics and rugged enclosures, EnduroMax units sustain critical operations through grid outages and peak loads. Designed for easy servicing and long service intervals, they’re the trusted choice for remote and demanding industrial sites.'
  },
  safety: {
    name: 'TotalSite Safety Kit',
    image: 'assets/images/products/safety-boots.jpg',
    price: 'From R1,200',
    long: 'The TotalSite Safety Kit bundles certified safety gear into a single, convenient package — helmets, steel-toe boots, gloves and high-visibility garments selected for site compliance and lasting comfort. It’s a fast way to outfit crews and meet regulatory requirements while ensuring reliable protection on site.'
  },
  nuts: {
    name: 'PrecisionLock Hex Nuts',
    image: 'assets/images/gallery/nuts-gallery.jpg',
    price: 'From R5.50',
    long: 'PrecisionLock hex nuts are manufactured to tight dimensional tolerances and from corrosion-resistant materials for high-reliability fastening in structural and mechanical assemblies. Available in metric and imperial sizes, PrecisionLock offers consistent thread engagement and reduced risk of loosening under vibration, making them ideal for heavy-duty installations.'
  },
  bolts: {
    name: 'HexGrip High‐Tensile Bolts',
    image: 'assets/images/gallery/bolts-gallery.jpg',
    price: 'From R7.00',
    long: 'HexGrip high-tensile bolts (Grades 8.8 & 10.9) are heat-treated and precision-threaded to provide superior shear and fatigue resistance. Engineered for demanding structural and mechanical applications, HexGrip bolts deliver secure clamping force, excellent material strength and consistent performance under heavy loads.'
  },
  bearings: {
    name: 'Duramax Roller & Ball Bearings',
    image: 'assets/images/gallery/bearings-gallery.jpg',
    price: 'From R120.00',
    long: 'Duramax bearings (sealed and open options) are built for long operational life and low friction in heavy machinery. Manufactured from high-grade steels and processed for tight running tolerances, Duramax bearings reduce maintenance cycles and improve reliability across conveyors, gearboxes and rotating equipment.'
  },
  vbelts: {
    name: 'PowerDrive V-Belts',
    image: 'assets/images/gallery/vbelts-gallery.jpg',
    price: 'From R95.00',
    long: 'PowerDrive V-Belts are crafted from premium compounds and reinforced cores to provide consistent power transmission across drive systems. Designed for long service life and resistance to heat and wear, PowerDrive belts minimise stretch and downtime in conveyors, pumps and industrial drives.'
  }
  ,
  angle_grinder: {
    name: 'Industrial Angle Grinder',
    image: 'assets/images/products/angle-grinder.jpg',
    price: 'From R2,500',
    long: 'High-performance industrial angle grinders for cutting and grinding in heavy-duty metalworking applications. Designed for extended runtime, improved cooling and easy wheel changes to maximise productivity onsite.'
  },
  arc_welder: {
    name: 'ARC Welding Machine',
    image: 'assets/images/products/arc-welder.jpg',
    price: 'From R8,500',
    long: 'Portable ARC welding machines built for reliable onsite repairs and fabrication. Robust design, stable arc control and easy-to-service components make these units an excellent fit for workshops and field teams.'
  },
  conveyor_rollers: {
    name: 'Conveyor Rollers',
    image: 'assets/images/products/conveyor-rollers.jpg',
    price: 'From R450',
    long: 'Durable conveyor rollers engineered for long life under heavy loads. Precision-machined bearings and corrosion-resistant finishes reduce downtime and maintenance on bulk material handling lines.'
  },
  air_hose: {
    name: 'Industrial Air Hose',
    image: 'assets/images/products/industrial-air-hose.jpg',
    price: 'From R1,800',
    long: 'High-pressure industrial air hoses designed for reliable delivery of compressed air in harsh environments. Flexible, abrasion-resistant and compatible with a wide range of fittings and couplings.'
  },
  power_drill: {
    name: 'Industrial Power Drill',
    image: 'assets/images/products/power-drill.jpg',
    price: 'From R3,200',
    long: 'Heavy-duty power drills and drivers made for demanding industrial drilling tasks. Ergonomic design, long-life motors and robust gearboxes for high-torque applications.'
  },
  jack_hammer: {
    name: 'Pneumatic Jack Hammer',
    image: 'assets/images/products/jack-hammer.jpg',
    price: 'From R12,000',
    long: 'Pneumatic jack hammers delivering powerful impact for concrete breaking and demolition. Built for operator comfort and easy maintenance in tough construction environments.'
  },
  hard_hats: {
    name: 'Safety Hard Hats',
    image: 'assets/images/products/hard-hats.jpg',
    price: 'From R180',
    long: 'Certified safety hard hats offering advanced impact protection and comfort for extended wear. Available with adjustable suspension and accessory mounts.'
  },
  safety_gloves: {
    name: 'Industrial Safety Gloves',
    image: 'assets/images/products/safety-gloves.jpg',
    price: 'From R85',
    long: 'Cut-resistant and chemical-protective safety gloves designed for industrial environments to protect hands while maximising dexterity.'
  }
};

function createModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'product-modal';

  // accessibility: role, aria-modal and tabindex for focus management
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('tabindex', '-1');

  modal.innerHTML = `
    <button class="modal-close" aria-label="Close dialog">Close</button>
    <div class="modal-content">
      <div class="modal-image"><img src="" alt=""></div>
      <div class="modal-body">
        <h3 id="product-modal-title"></h3>
        <p class="price"></p>
        <p class="long-desc"></p>
        <div style="margin-top:16px">
          <a href="mailto:info.jadula@gmail.com" class="cta-button">Request Quote</a>
        </div>
      </div>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Close handlers
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(overlay);
  });
  modal.querySelector('.modal-close').addEventListener('click', () => closeModal(overlay));

  // set aria-labelledby
  modal.setAttribute('aria-labelledby', 'product-modal-title');

  return overlay;
}

function openModal(key) {
  const data = PRODUCT_DETAILS[key];
  if (!data) return;
  let overlay = document.querySelector('.modal-overlay');
  if (!overlay) overlay = createModal();

  const modal = overlay.querySelector('.product-modal');
  modal.querySelector('.modal-image img').src = data.image;
  modal.querySelector('.modal-image img').alt = data.name;
  modal.querySelector('.modal-body h3').textContent = data.name;
  modal.querySelector('.modal-body .price').textContent = data.price;
  modal.querySelector('.modal-body .long-desc').textContent = data.long;
  modal.querySelector('.modal-body .cta-button').href = `mailto:info.jadula@gmail.com?subject=Quote%20Request%3A%20${encodeURIComponent(data.name)}&body=${encodeURIComponent('Hello Jadula,\n\nI would like a quote for ' + data.name + '\n\nQuantity: \n\nPlease contact me at [phone or email].\n\nThanks.')}`;

  // show
  requestAnimationFrame(() => {
    overlay.classList.add('show');
    modal.classList.add('show');
  });
  // accessibility: trap focus and handle ESC
  enableModalA11y(overlay);
}

function closeModal(overlay) {
  overlay.classList.remove('show');
  const modal = overlay.querySelector('.product-modal');
  if (modal) modal.classList.remove('show');
  disableModalA11y();
  setTimeout(() => {
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
  }, 350);
}

// Attach listeners to buttons with data-product-key
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.more-info-btn, [data-product-key]');
  if (!btn) return;
  e.preventDefault();
  const key = btn.getAttribute('data-product-key');
  if (key && PRODUCT_DETAILS[key]) {
    openModal(key);
    return;
  }

  // Fallback: build modal content from the DOM nearby if PRODUCT_DETAILS missing
  const card = btn.closest('.p-4') || btn.closest('.gallery-item') || btn.closest('.bg-primary-dark') || btn.closest('.category-card') || btn.parentElement;
  const nameEl = card ? (card.querySelector('h4') || card.querySelector('h3')) : null;
  const descEl = card ? card.querySelector('p.text-sm, p') : null;
  const imgEl = card ? card.querySelector('img') : null;
  const priceEl = card ? card.querySelector('.text-secondary') : null;

  const data = {
    name: nameEl ? nameEl.textContent.trim() : 'Product',
    long: descEl ? descEl.textContent.trim() : '',
    image: imgEl ? (imgEl.getAttribute('src') || '') : '',
    price: priceEl ? priceEl.textContent.trim() : ''
  };

  openModalWithData(data);
});

function openModalWithData(data) {
  let overlay = document.querySelector('.modal-overlay');
  if (!overlay) overlay = createModal();
  const modal = overlay.querySelector('.product-modal');
  modal.querySelector('.modal-image img').src = data.image || '';
  modal.querySelector('.modal-image img').alt = data.name || '';
  modal.querySelector('.modal-body h3').textContent = data.name || '';
  modal.querySelector('.modal-body .price').textContent = data.price || '';
  modal.querySelector('.modal-body .long-desc').textContent = data.long || '';
  modal.querySelector('.modal-body .cta-button').href = `mailto:info.jadula@gmail.com?subject=Quote%20Request%3A%20${encodeURIComponent(data.name || '')}&body=${encodeURIComponent('Hello Jadula,\n\nI would like a quote for ' + (data.name || '') + '\n\nQuantity: \n\nPlease contact me at [phone or email].\n\nThanks.')}`;

  requestAnimationFrame(() => {
    overlay.classList.add('show');
    modal.classList.add('show');
  });
  enableModalA11y(overlay);
}

// Auto-insert "More Info" buttons into pages that don't yet include them
document.addEventListener('DOMContentLoaded', () => {
  const nameToKey = {};
  for (const k in PRODUCT_DETAILS) {
    if (Object.prototype.hasOwnProperty.call(PRODUCT_DETAILS, k)) {
      nameToKey[PRODUCT_DETAILS[k].name] = k;
    }
  }

  document.querySelectorAll('h4').forEach(h4 => {
    const name = h4.textContent.trim();
    const key = nameToKey[name];
    const container = h4.closest('.p-4') || h4.closest('.gallery-item') || h4.parentElement;
    if (!container) return;
    // skip if there's already an element with data-product-key or a .more-info-btn
    if (container.querySelector('[data-product-key]') || container.querySelector('.more-info-btn')) return;

    const btn = document.createElement('button');
    btn.className = 'more-info-btn text-sm mr-3';
    if (key) btn.setAttribute('data-product-key', key);
    btn.textContent = 'More Info';

    // find an action anchor (mailto or contact) to insert before, else append
    const anchor = container.querySelector('a[href^="mailto:"] , a[href$="contact.html"] , a.text-blue-400');
    if (anchor && anchor.parentNode) {
      anchor.parentNode.insertBefore(btn, anchor);
    } else {
      container.appendChild(btn);
    }
  });
});

// Accessibility helpers: focus trap and ESC to close
let _lastFocused = null;
let _keydownHandler = null;
function enableModalA11y(overlay) {
  const modal = overlay.querySelector('.product-modal');
  if (!modal) return;
  _lastFocused = document.activeElement;

  // focus the close button (first interactive element)
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) closeBtn.focus(); else modal.focus();

  const focusableSelectors = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
  const focusable = Array.from(modal.querySelectorAll(focusableSelectors)).filter(el => !el.hasAttribute('disabled'));
  const first = focusable[0] || modal;
  const last = focusable[focusable.length - 1] || modal;

  _keydownHandler = function(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault();
      closeModal(overlay);
      return;
    }
    if (e.key === 'Tab') {
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          (last).focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          (first).focus();
        }
      }
    }
  };

  document.addEventListener('keydown', _keydownHandler);
}

function disableModalA11y() {
  if (_keydownHandler) document.removeEventListener('keydown', _keydownHandler);
  if (_lastFocused && _lastFocused.focus) {
    try { _lastFocused.focus(); } catch (e) {}
  }
  _lastFocused = null;
  _keydownHandler = null;
}

// Export for console testing
window.openProductModal = openModal;
