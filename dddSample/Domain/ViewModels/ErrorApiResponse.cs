using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class ErrorApiResponse
    {
        public bool Success => false;
        public string Message { get; set; }
        public string ErrorCode { get; set; }
    }
}
