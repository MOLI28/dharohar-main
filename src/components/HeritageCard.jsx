import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function HeritageCard({ icon, title, description, image, featured, to, badge }) {
  const CardTag = to ? Link : 'div';
  return (
    <CardTag to={to} className={`h-card card ${featured ? 'h-card--featured' : ''}`}>
      {image && <div className="h-card__image-wrap"><img src={image} alt="" className="h-card__image" loading="lazy" /></div>}
      {featured && badge && <span className="h-card__badge">{badge}</span>}
      <div className="h-card__content">
        {icon && <span className="h-card__icon">{icon}</span>}
        <h3 className="h-card__title">{title}</h3>
        <p className="h-card__desc">{description}</p>
        {to && <span className="h-card__link">Explore <ArrowUpRight size={15} /></span>}
      </div>
      <style>{`
        .h-card{padding:0;display:flex;flex-direction:column;position:relative;overflow:hidden;min-height:300px;background:var(--slate);border:1px solid rgba(255,243,176,.16);border-radius:20px;transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease}.h-card:hover{transform:translateY(-6px);box-shadow:var(--shadow-3);border-color:rgba(224,159,62,.5)}
        .h-card__image-wrap{height:175px;overflow:hidden;background:var(--slate)}.h-card__image{width:100%;height:100%;object-fit:cover;transition:transform .5s ease}.h-card:hover .h-card__image{transform:scale(1.05)}
        .h-card__content{padding:22px 24px 24px;display:flex;flex-direction:column;gap:10px;flex:1}.h-card__icon{font-size:25px;line-height:1}.h-card__title{font-size:22px;color:var(--vanilla)}.h-card__desc{color:rgba(255,243,176,.72);font-size:14px;line-height:1.6}.h-card__link{margin-top:auto;display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--yellow)}
        .h-card--featured{border-color:rgba(224,159,62,.4)}.h-card__badge{position:absolute;top:15px;right:15px;z-index:2;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--slate);background:var(--yellow);padding:6px 10px;border-radius:999px;font-weight:800}
      `}</style>
    </CardTag>
  );
}
