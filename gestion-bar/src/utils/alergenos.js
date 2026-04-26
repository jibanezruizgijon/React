import iconGluten from '../assets/icons/alergenoGluten.svg';
import iconHuevo from '../assets/icons/alergenoHuevo.svg';
import iconSoja from '../assets/icons/alergenoSoja.svg';
import iconMolusco from '../assets/icons/alergenoMolusco.svg';
import iconCascara from '../assets/icons/alergenoCascara.svg';
import iconCrustaceo from '../assets/icons/alergenoCrustaceo.svg';
import iconPescado from '../assets/icons/alergenoPescado.svg';
import iconSesamo from '../assets/icons/alergenoSesamo.svg';
import iconMostaza from '../assets/icons/alergenoMostaza.svg';
import iconLacteos from '../assets/icons/alergenoLacteos.svg';
import iconCacahuetes from '../assets/icons/alergenoCacahuetes.svg';
import iconApio from '../assets/icons/alergenoApio.svg';
import iconSulfito from '../assets/icons/alergenoSulfito.svg';
import iconAltramuces from '../assets/icons/alergenoAltramuces.svg';

// Mapa: nombre del alérgeno (en minúsculas) → metadatos
export const ALERGENOS_META = {
  gluten:      { icono: iconGluten,     desc: 'Proteína presente en cereales como trigo, cebada y centeno' },
  huevo:       { icono: iconHuevo,      desc: 'Huevo y productos que lo contienen como ingrediente' },
  soja:        { icono: iconSoja,       desc: 'Legumbre utilizada en muchos productos y derivados vegetales' },
  molusco:     { icono: iconMolusco,    desc: 'Mariscos como mejillones, almejas, ostras o calamares' },
  cascara:     { icono: iconCascara,    desc: 'Incluye nueces, almendras, avellanas, pistachos, etc.' },
  crustaceo:   { icono: iconCrustaceo,  desc: 'Mariscos como gambas, langostinos, cangrejos o bogavantes' },
  pescado:     { icono: iconPescado,    desc: 'Carne y derivados de pescado marino o de agua dulce' },
  sesamo:      { icono: iconSesamo,     desc: 'Semillas de sésamo y productos derivados' },
  mostaza:     { icono: iconMostaza,    desc: 'Semillas y productos elaborados a base de mostaza' },
  lactosa:     { icono: iconLacteos,    desc: 'Azúcar natural de la leche y productos lácteos' },
  cacahuete:   { icono: iconCacahuetes, desc: 'Cacahuetes y productos derivados' },
  apio:        { icono: iconApio,       desc: 'Apio y productos derivados' },
  sulfitos:    { icono: iconSulfito,    desc: 'Sulfitos y dióxido de azufre en concentraciones > 10 mg/kg' },
  altramuces:  { icono: iconAltramuces, desc: 'Altramuces y productos derivados' },
};

/**
 * Devuelve el icono SVG para un alérgeno dado su nombre.
 * Acepta tanto el nombre del backend como variantes (ej. "Gluten" → "gluten").
 */
export function getIconoAlergeno(nombre) {
  if (!nombre) return null;
  const clave = nombre.toLowerCase().trim();
  return ALERGENOS_META[clave]?.icono ?? null;
}

/**
 * Devuelve la descripción de un alérgeno.
 */
export function getDescAlergeno(nombre) {
  if (!nombre) return '';
  const clave = nombre.toLowerCase().trim();
  return ALERGENOS_META[clave]?.desc ?? '';
}
