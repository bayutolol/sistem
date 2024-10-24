import Link from 'next/link'
import React from 'react'
import Image from 'next/image' // Import Image dari next/image

export default function Header() {
    return (
        <div>
            <header id="header" className="header fixed-top d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-between">
                    <Link href="/" className="logo d-flex align-items-center">
                        {/* Gunakan komponen <Image /> untuk menggantikan <img> */}
                        <Image
                            src="/img/foto.png"
                            alt="Profile"
                            width={50} // Sesuaikan ukuran yang diinginkan
                            height={50} // Sesuaikan ukuran yang diinginkan
                            className="rounded-circle"
                        />
                        <span className="d-none d-lg-block">SEKOLAH</span>
                    </Link>
                    <i className="bi bi-list toggle-sidebar-btn" />
                </div>
                {/* End Logo */}
                <div className="search-bar">
                    <form className="search-form d-flex align-items-center" method="POST" action="#">
                        {/* Komentar di bagian search */}
                    </form>
                </div>
                {/* End Search Bar */}
                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">
                        <li className="nav-item dropdown pe-3">
                            <a
                                className="nav-link nav-profile d-flex align-items-center pe-0"
                                href="#"
                                data-bs-toggle="dropdown"
                            >
                                {/* Gunakan komponen <Image /> untuk menggantikan <img> */}
                                <Image
                                    src="/img/rpl.jpg"
                                    alt="Profile"
                                    width={40} // Sesuaikan ukuran yang diinginkan
                                    height={40} // Sesuaikan ukuran yang diinginkan
                                    className="rounded-circle"
                                />
                                <span className="d-none d-md-block dropdown-toggle ps-2">
                                    PPLG
                                </span>
                            </a>
                            {/* End Profile Image Icon */}
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li className="dropdown-header">
                                    <h6>irsyad</h6>
                                    <span>Web sekolah</span>
                                </li>
                                {/* Komentar bagian lain jika tidak digunakan */}
                            </ul>
                            {/* End Profile Dropdown Items */}
                        </li>
                        {/* End Profile Nav */}
                    </ul>
                </nav>
                {/* End Icons Navigation */}
            </header>
        </div>
    )
}
