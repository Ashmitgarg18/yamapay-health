import Link from 'next/link';

const NavBar = () => {
  return (
    <ul className="nav nav-tabs" role="tablist">
      <li className="nav-item">
        <Link href="/?test=bmp" className="nav-link">
          <i className="fas fa-flask"></i>BMP
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/?test=cmp" className="nav-link">
          <i className="fas fa-flask"></i>CMP
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/?test=ecg" className="nav-link">
          <i className="fas fa-heartbeat"></i>ECG
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/?test=hba1c" className="nav-link">
          <i className="fas fa-vial"></i>HbA1c
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/?test=lipid-panel" className="nav-link">
          <i className="fas fa-vials"></i>Lipid Panel
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/?test=liver-function" className="nav-link">
          <i className="fas fa-liver"></i>Liver Function
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/?test=psa" className="nav-link">
          <i className="fas fa-procedures"></i>PSA
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/?test=thyroid-panel" className="nav-link">
          <i className="fas fa-dna"></i>Thyroid Panel
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/?test=urianalysis" className="nav-link">
          <i className="fas fa-tint"></i>Urinalysis
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/?test=cbc" className="nav-link">
          <i className="fas fa-syringe"></i>CBC
        </Link>
      </li>
    </ul>
  );
};

export default NavBar;
