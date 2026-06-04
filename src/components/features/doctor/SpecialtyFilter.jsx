import React from 'react';
const SPECIALTIES = [
  'Umum', 'Mata', 'Jiwa', 'Otak', 'Kandungan',
  'Anak', 'Penyakit Dalam', 'THT', 'Ortopedi',
  'Paru', 'Bedah Umum', 'Jantung',
];

/**
 * SpecialtyFilter — renders a list of specialty checkboxes.
 * Extracted from DoctorList to eliminate JSX duplication.
 */
const SpecialtyFilter = ({ selectedJobs, onChange }) => {
  return (
    <div className="jenis-spesialis">
      <p>Jenis Spesialis :</p>
      {SPECIALTIES.map((spec) => (
        <label key={spec}>
          <input
            type="checkbox"
            value={spec}
            checked={selectedJobs.includes(spec)}
            onChange={onChange}
          />
          {spec}
        </label>
      ))}
    </div>
  );
};

export default SpecialtyFilter;
