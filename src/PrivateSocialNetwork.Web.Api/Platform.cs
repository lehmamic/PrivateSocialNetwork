using System;
using Microsoft.Dnx.Runtime;

namespace PrivateSocialNetwork.Web.Api
{
    public class Platform
    {
        private readonly IRuntimeEnvironment _runtimeEnvironment;

        private bool? _isMono;
        private bool? _isWindows;

        public Platform(IRuntimeEnvironment runtimeEnvironment)
        {
            if (runtimeEnvironment == null)
            {
                throw new ArgumentNullException(nameof(runtimeEnvironment));
            }

            _runtimeEnvironment = runtimeEnvironment;
        }

        public bool IsRunningOnWindows
        {
            get
            {
                if (_isWindows == null)
                {
                    _isWindows = _runtimeEnvironment.OperatingSystem.Equals("Windows", StringComparison.OrdinalIgnoreCase);
                }

                return _isWindows.Value;
            }
        }

        public bool IsRunningOnMono
        {
            get
            {
                if (_isMono == null)
                {
                    _isMono = _runtimeEnvironment.RuntimeType.Equals("Mono", StringComparison.OrdinalIgnoreCase);
                }

                return _isMono.Value;
            }
        }
    }
}
