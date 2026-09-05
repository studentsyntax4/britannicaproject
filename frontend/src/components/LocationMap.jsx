import React from 'react';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { BRAND } from '../mock';

// Google Maps embed (no API key needed) centered on the shop's general area.
const SHOP_QUERY = 'Sitabuldi, Nagpur, Maharashtra';
const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(SHOP_QUERY)}&z=15&output=embed`;
const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SHOP_QUERY)}`;

const LocationMap = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="text-center mb-10">
        <p className="font-poster text-sm tracking-[0.2em] text-[#C8641E] mb-1">COME SAY HELLO</p>
        <h2 className="font-display text-3xl md:text-4xl font-black text-[#3E2417]">Visit our Nagpur kitchen</h2>
      </div>

      <div className="rounded-[2rem] overflow-hidden border border-[#E7D6B4] bg-white grid lg:grid-cols-[1fr_1.5fr]">
        {/* Details */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="w-12 h-12 rounded-2xl bg-[#F6DCB8] text-[#C8641E] flex items-center justify-center shrink-0"><MapPin size={22} /></span>
              <div>
                <p className="font-semibold text-[#3E2417]">Where to find us</p>
                <p className="text-sm text-[#7A6A55] mt-0.5">{BRAND.location}<br />Maharashtra, India</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-12 h-12 rounded-2xl bg-[#F6DCB8] text-[#C8641E] flex items-center justify-center shrink-0"><Clock size={22} /></span>
              <div>
                <p className="font-semibold text-[#3E2417]">Opening hours</p>
                <p className="text-sm text-[#7A6A55] mt-0.5">{BRAND.hours}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-12 h-12 rounded-2xl bg-[#F6DCB8] text-[#C8641E] flex items-center justify-center shrink-0"><Phone size={22} /></span>
              <div>
                <p className="font-semibold text-[#3E2417]">Call to order</p>
                <p className="text-sm text-[#7A6A55] mt-0.5">{BRAND.phone}</p>
              </div>
            </div>
          </div>

          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#3E2417] text-white font-semibold w-fit hover:bg-[#2C1810] transition-all hover:gap-3"
          >
            <Navigation size={18} /> Get directions
          </a>
          <p className="text-xs text-[#7A6A55] mt-3">Opens Google Maps with directions from your current location.</p>
        </div>

        {/* Map */}
        <div className="relative min-h-[320px] lg:min-h-[420px]">
          <iframe
            title="Tarri and Treacle location — Sitabuldi, Nagpur"
            src={embedSrc}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
