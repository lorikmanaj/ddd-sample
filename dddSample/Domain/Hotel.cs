﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Hotel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal StarsRating { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }
    }
}
